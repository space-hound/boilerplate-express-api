import httpStatus from 'http-status';

import { AsyncUtils } from 'shared/utilities';

import { ErrorExceptions } from 'core/error';
import { TokenService } from 'core/token';
import { MailerService } from 'core/mailer';

import { UserService } from 'features/user';

import AuthExceptions from './auth.exceptions';

/**
 * Authentication Controller
 */
export default class AuthController {

    /**
     * Method: POST
     *
     * Path: /api/auth/register
     */
    static register = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };

        const userDoc = await UserService.createUser(data);

        const authToken = await TokenService.generateAuthToken(userDoc);
        const refreshToken = await TokenService.generateRefreshToken(userDoc);

        res.status(httpStatus.CREATED).send({
            user: userDoc.toPlainObject(),
            tokens: {
                auth: authToken,
                refresh: refreshToken,
            },
        });
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/login
     */
    static login = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };

        const userDoc = await UserService.getUserByEmail(data.email);

        if (!userDoc) {
            throw AuthExceptions.EMAIL_PASSWORD_WRONG();
        }

        const isPasswordMatch = await userDoc.isPasswordMatch(data.password);

        if (!isPasswordMatch) {
            throw AuthExceptions.EMAIL_PASSWORD_WRONG();
        }

        await TokenService.cleanupRefreshTokens(userDoc.id);

        const authToken = await TokenService.generateAuthToken(userDoc);
        const refreshToken = await TokenService.generateRefreshToken(userDoc);

        res.send({
            user: userDoc.toPlainObject(),
            tokens: {
                auth: authToken,
                refresh: refreshToken,
            }
        });
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/logout
     */
    static logout = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            token: req.body.token,
        };

        const refreshTokenDoc = await TokenService.verifyRefreshToken(data.token);

        await TokenService.cleanupRefreshTokens(refreshTokenDoc.user);

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/refresh
     */
    static refresh = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            token: req.body.token,
        };

        const refreshTokenDoc = await TokenService.verifyRefreshToken(data.token);

        const userDoc = await UserService.getUserById(refreshTokenDoc.user);

        if (!userDoc) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        await TokenService.cleanupRefreshTokens(userDoc.id);

        const authToken = await TokenService.generateAuthToken(userDoc);
        const refreshToken = await TokenService.generateRefreshToken(userDoc);

        res.send({
            tokens: {
                auth: authToken,
                refresh: refreshToken,
            }
        });
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/send-verify-account-email
     */
    static sendVerifyAccountEmail = AsyncUtils.asyncHandler(async (req, res) => {
        const userDoc = req.locals.user;

        if (userDoc.isVerified) {
            throw AuthExceptions.ACCOUNT_ALREADY_VERIFIED();
        }

        await TokenService.cleanupVerifyAccountTokens(userDoc.id);

        const verifyAccountToken = await TokenService.generateVerifyAccountToken(userDoc);

        await MailerService.sendVerifyAccountEmail(userDoc.email, verifyAccountToken);

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/verify-account
     */
    static verifyAccount = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            token: req.body.token,
        };

        const verifyAccountTokenDoc = await TokenService.verifyVerifyAccountToken(data.token);

        const userDoc = await UserService.getUserById(verifyAccountTokenDoc.user);

        if (!userDoc) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        try {
            await UserService.modUserMarkVerified(userDoc.id);
            await TokenService.cleanupVerifyAccountTokens(userDoc.id);
        } catch (error) {
            throw AuthExceptions.ACCOUNT_VERIFICATION_FAILED();
        }

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/send-reset-password-email
     */
    static sendResetPasswordEmail = AsyncUtils.asyncHandler(async (req, res) => {
        const userDoc = req.locals.user;

        await TokenService.cleanupResetPasswordTokens(userDoc.id);

        const resetPasswordToken = await TokenService.generateResetPasswordToken(userDoc);

        await MailerService.sendResetPasswordEmail(userDoc.email, resetPasswordToken);

        res.status(httpStatus.NO_CONTENT).send();
    });

    /**
     * Method: POST
     *
     * Path: /api/auth/reset-password
     */
    static resetPassword = AsyncUtils.asyncHandler(async (req, res) => {
        const data = {
            token: req.body.token,
            password: req.body.password,
        };

        const resetPasswordTokenDoc = await TokenService.verifyResetPasswordToken(data.token);

        const userDoc = await UserService.getUserById(resetPasswordTokenDoc.user);

        if (!userDoc) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        try {
            await UserService.modUserChangePassword(userDoc.id, data.password);
            await TokenService.cleanupResetPasswordTokens(userDoc.id);
        } catch (error) {
            throw AuthExceptions.PASSWORD_RESET_FAILED();
        }

        res.status(httpStatus.NO_CONTENT).send();
    });
}
