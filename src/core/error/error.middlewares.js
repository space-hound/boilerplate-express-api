import mongoose from 'mongoose';
import httpStatus from 'http-status';

import config from 'config';

import { LoggerService } from 'core/logger';

import BaseError from './errors/BaseError';
import ApiError from './errors/ApiError';

/**
 * Error Middlewares
 */
export default class ErrorMiddlewares {

    /**
     * Converts unknown errors to ApiError.
     */
    static converter = (error, req, res, next) => {
        let finalError = error;

        const isBaseType = finalError instanceof BaseError;
        const isMongoType = finalError instanceof mongoose.Error;

        if (!isBaseType) {

            let errorStatusCode = finalError.statusCode;

            if (!errorStatusCode) {
                if (isMongoType) {
                    errorStatusCode = httpStatus.BAD_REQUEST;
                } else {
                    errorStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
                }
            }

            let errorStatusMessage = finalError.message;

            if (!errorStatusMessage) {
                errorStatusMessage = httpStatus[errorStatusCode];
            }

            finalError = new ApiError({
                isOperational: false,
                stack: finalError.stack,
                message: errorStatusMessage,
                statusCode: errorStatusCode,
            });
        }

        next(finalError);
    };

    /**
     * Handles all error not caught and treated across the app.
     */
    static handler = (error, req, res) => {
        let {
            stack,
            message,
            statusCode,
            isOperational
        } = error;

        if (config.envs.isProd) {
            if (!isOperational) {
                statusCode = httpStatus.INTERNAL_SERVER_ERROR;
                message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
            }
        }

        if (config.envs.isDev) {
            LoggerService.logger.error(error);
        }

        const response = {
            message,
            code: statusCode,
        };

        if (config.envs.isDev) {
            response.stack = stack;
        }

        res.status(statusCode).send(response);
    };
}
