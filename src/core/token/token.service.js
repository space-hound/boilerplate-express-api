import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken';

import { ErrorExceptions } from 'core/error';

import TokenEnums from './token.enums';
import TokenModel from './token.model';
import TokenUtils from './token.utils.js';

/**
 * Token Service
 */
export default class TokenService {

    /**
     * Generates a token.
     *
     * @param {Object} options
     * @param {string} options.type
     * @param {UserModel} options.user
     * @param {boolean} [options.saveToDatabase]
     * @returns {Promise<string>}
     */
    static generateToken = async ({ type, user, saveToDatabase = true }) => {
        const {
            secret,
            expiration,
            expirationUnit,
        } = TokenUtils.getTokenConfig(type);

        const created = moment();
        const expires = moment().add(
            expiration,
            expirationUnit
        );

        const payload = {
            sub: user.id,
            iat: created.unix(),
            exp: expires.unix(),
            role: user.role,
            rights: user.rights,
        };

        const token = jsonwebtoken.sign(payload, secret);

        if (saveToDatabase) {
            await TokenModel.create({
                token,
                user: user.id,
                type,
                expires: expires.toDate(),
                blacklisted: false,
            });
        }

        return token;
    };

    /**
     * Generates a AUTH token.
     *
     * @param {UserModel} user
     * @returns {Promise<string>}
     */
    static generateAuthToken = async (user) => {
        return TokenService.generateToken({
            user, type: TokenEnums.TOKENS.AUTH, saveToDatabase: false,
        });
    };

    /**
     * Generates a REFRESH token, and saves it to the database.
     *
     * @param {UserModel} user
     * @returns {Promise<string>}
     */
    static generateRefreshToken = async (user) => {
        return TokenService.generateToken({
            user, type: TokenEnums.TOKENS.REFRESH, saveToDatabase: true,
        });
    };

    /**
     * Generates a VERIFY_ACCOUNT token, and saves it to the database.
     *
     * @param {UserModel} user
     * @returns {Promise<string>}
     */
    static generateVerifyAccountToken = async (user) => {
        return TokenService.generateToken({
            user, type: TokenEnums.TOKENS.VERIFY_ACCOUNT, saveToDatabase: true,
        });
    };

    /**
     * Generates a RESET_PASSWORD token, and saves it to the database.
     *
     * @param {UserModel} user
     * @returns {Promise<string>}
     */
    static generateResetPasswordToken = async (user) => {
        return TokenService.generateToken({
            user, type: TokenEnums.TOKENS.RESET_PASSWORD, saveToDatabase: true,
        });
    };

    /**
     * Verifies a given token and returns the token document from the database.
     *
     * Throws ApiError with status code of UNAUTHORIZED if token is invalid.
     *
     * Accepted token types are: REFRESH, VERIFY_ACCOUNT, RESET_PASSWORD.
     *
     * @param {string} token
     * @param {string} type
     * @returns {Promise<TokenModel>}
     * @throws {ApiError} - UNAUTHORIZED
     */
    static verifyToken = async (token, type) => {
        const { secret } = TokenUtils.getTokenConfig(type);

        let payload = null;

        try {
            payload = jsonwebtoken.verify(token, secret);
        } catch (error) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        const tokenDoc = await TokenModel.findOne({
            token,
            user: payload.sub,
            type,
            blacklisted: false,
            expires: {
                $gt: moment().toDate(),
            },
        }).exec();

        if (!tokenDoc) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        return tokenDoc;
    };

    /**
     * Verifies a given REFRESH token and returns the token document from the database.
     *
     * Throws ApiError with status code of UNAUTHORIZED if token is invalid.
     *
     * @param {string} refreshAuthToken
     * @returns {Promise<TokenModel>}
     * @throws {ApiError} - UNAUTHORIZED
     */
    static verifyRefreshToken = async (refreshAuthToken) => {
        return TokenService.verifyToken(refreshAuthToken, TokenEnums.TOKENS.REFRESH);
    };

    /**
     * Verifies a given VERIFY_ACCOUNT token and returns the token document from the database.
     *
     * Throws ApiError with status code of UNAUTHORIZED if token is invalid.
     *
     * @param {string} verifyAccountToken
     * @returns {Promise<TokenModel>}
     * @throws {ApiError} - UNAUTHORIZED
     */
    static verifyVerifyAccountToken = async (verifyAccountToken) => {
        return TokenService.verifyToken(verifyAccountToken, TokenEnums.TOKENS.VERIFY_ACCOUNT);
    };

    /**
     * Verifies a given RESET_PASSWORD token and returns the token document from the database.
     *
     * Throws ApiError with status code of UNAUTHORIZED if token is invalid.
     *
     * @param {string} resetPasswordToken
     * @returns {Promise<TokenModel>}
     * @throws {ApiError} - UNAUTHORIZED
     */
    static verifyResetPasswordToken = async (resetPasswordToken) => {
        return TokenService.verifyToken(resetPasswordToken, TokenEnums.TOKENS.RESET_PASSWORD);
    };

    /**
     * Deletes all the REFRESH tokens from the database for the given user.
     *
     * @param {ObjectId} userId
     * @returns {Promise<void>}
     */
    static cleanupRefreshTokens = async (userId) => {
        return TokenModel.deleteMany({ user: userId, type: TokenEnums.TOKENS.REFRESH });
    };

    /**
     * Deletes all the VERIFY_ACCOUNT tokens from the database for the given user.
     *
     * @param {ObjectId} userId
     * @returns {Promise<void>}
     */
    static cleanupVerifyAccountTokens = async (userId) => {
        return TokenModel.deleteMany({ user: userId, type: TokenEnums.TOKENS.VERIFY_ACCOUNT });
    };

    /**
     * Deletes all the RESET_PASSWORD tokens from the database for the given user.
     *
     * @param {ObjectId} userId
     * @returns {Promise<void>}
     */
    static cleanupResetPasswordTokens = async (userId) => {
        return TokenModel.deleteMany({ user: userId, type: TokenEnums.TOKENS.RESET_PASSWORD });
    };
}
