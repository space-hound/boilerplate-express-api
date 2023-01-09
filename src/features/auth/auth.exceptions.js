import httpStatus from 'http-status';

import { ApiError } from 'core/error';

/**
 * Authentication Exceptions
 */
export default class AuthExceptions {

    /**
     * Status Code: UNAUTHORIZED
     *
     * @returns {ApiError}
     */
    static EMAIL_PASSWORD_WRONG = () => {
        return new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'Wrong email or password',
        });
    };

    /**
     * Status Code: INTERNAL_SERVER_ERROR
     *
     * @returns {ApiError}
     */
    static ACCOUNT_VERIFICATION_FAILED = () => {
        return new ApiError({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Account verification failed',
        });
    };

    /**
     * Status Code: BAD_REQUEST
     *
     * @returns {ApiError}
     */
    static ACCOUNT_ALREADY_VERIFIED = () => {
        return new ApiError({
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Account already verified',
        });
    };

    /**
     * Status Code: INTERNAL_SERVER_ERROR
     *
     * @returns {ApiError}
     */
    static PASSWORD_RESET_FAILED = () => {
        return new ApiError({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Password reset failed',
        });
    };
}
