import Joi from 'joi';

import { PasswordValidator } from 'core/validation';

/**
 * Authentication Validations
 */
export default class AuthValidations {

    /**
     * Validates POST requests to /api/auth/register
     */
    static register = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(PasswordValidator.validateJoi),
            repeatPassword: Joi.string().required().valid(Joi.ref('password')),
        }),
    };

    /**
     * Validates POST requests to /api/auth/login
     */
    static login = {
        body: Joi.object().keys({
            email: Joi.string().required(), password: Joi.string().required(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/logout
     */
    static logout = {
        body: Joi.object().keys({
            token: Joi.string().required(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/refresh
     */
    static refresh = {
        body: Joi.object().keys({
            token: Joi.string().required(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/send-verify-account-email
     */
    static sendVerifyAccountEmail = {};

    /**
     * Validates POST requests to /api/auth/verify-account
     */
    static verifyAccount = {
        body: Joi.object().keys({
            token: Joi.string().required(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/send-reset-password-rmail
     */
    static sendResetPasswordEmail = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/reset-password
     */
    static resetPassword = {
        body: Joi.object().keys({
            token: Joi.string().required(),
            password: Joi.string().required().custom(PasswordValidator.validateJoi),
            repeatPassword: Joi.string().required().valid(Joi.ref('password')),
        }),
    };
}
