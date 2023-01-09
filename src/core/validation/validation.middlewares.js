import Joi from 'joi';
import httpStatus from 'http-status';

import { ObjectUtils } from 'shared/utilities';

import { ApiError } from 'core/error';

/**
 * Validation Middlewares
 */
export default class ValidationMiddlewares {

    /**
     * Creates an express middleware function.
     *
     * Validates the request data against the given schema using Joi.
     *
     * @param {object} schema
     * @returns {function}
     */
    static createRequestDataValidator = (schema) => (req, res, next) => {
        if (!Object.keys(schema).length) {
            return next();
        }

        const joiKeys = [
            'headers',
            'params',
            'query',
            'body',
        ];

        const joiOptions = {
            abortEarly: false,
        };

        const currentSchema = ObjectUtils.pick(schema, joiKeys);
        const currentObject = ObjectUtils.pick(req, Object.keys(currentSchema));

        const { value, error } = Joi.compile(currentSchema).prefs(joiOptions).validate(currentObject);

        if (error) {
            const message = error.details.map((details) => details.message).join(', ');
            const apiError = new ApiError({ message, statusCode: httpStatus.BAD_REQUEST });

            return next(apiError);
        }

        req.locals.data = value;

        return next();
    };
}
