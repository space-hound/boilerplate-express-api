import httpStatus from 'http-status';

import ApiError from './errors/ApiError';

/**
 * Error Exceptions.
 */
export default class ErrorExceptions {

    /**
     * Status Code: NOT_FOUND
     *
     * @returns {ApiError}
     */
    static NOT_FOUND = () => {
        return new ApiError({
            statusCode: httpStatus.NOT_FOUND,
            message: httpStatus[httpStatus.NOT_FOUND],
        });
    };

    /**
     * Status Code: BAD_REQUEST
     *
     * @returns {ApiError}
     */
    static BAD_REQUEST = () => {
        return new ApiError({
            statusCode: httpStatus.BAD_REQUEST,
            message: httpStatus[httpStatus.BAD_REQUEST],
        });
    };

    /**
     * Status Code: FORBIDDEN
     *
     * @returns {ApiError}
     */
    static FORBIDDEN = () => {
        return new ApiError({
            statusCode: httpStatus.FORBIDDEN,
            message: httpStatus[httpStatus.FORBIDDEN],
        });
    };

    /**
     * Status Code: UNAUTHORIZED
     *
     * @returns {ApiError}
     */
    static UNAUTHORIZED = () => {
        return new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: httpStatus[httpStatus.UNAUTHORIZED],
        });
    };
}
