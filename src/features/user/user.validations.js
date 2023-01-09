import Joi from 'joi';

import {
    PasswordValidator,
    ObjectIdValidator,
} from 'core/validation';

import UserEnums from './user.enums';

/**
 * User Validations
 */
export default class UserValidations {

    /**
     * Validates GET requests to /api/user/
     */
    static getUsers = {};

    /**
     * Validates POST requests to /api/user/
     */
    static createUser = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(PasswordValidator.validateJoi),
            repeatPassword: Joi.string().required().valid(Joi.ref('password')),
            role: Joi.string().required().valid(...UserEnums.ROLES_ARRAY),
        }),
    };

    /**
     * Validates GET requests to /api/user/:userId
     */
    static getUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
    };

    /**
     * Validates PATCH requests to /api/user/:userId
     */
    static updateUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
        body: Joi.object().keys({
            email: Joi.string().email(),
            role: Joi.string().valid(...UserEnums.ROLES_ARRAY),
        }).min(1),
    };

    /**
     * Validates DELETE requests to /api/user/:userId
     */
    static deleteUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
    };
}
