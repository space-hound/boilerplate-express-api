import passport from 'passport';

import { ErrorExceptions } from 'core/error';

import PassportJwtStrategy from './configs/passport-jwt-startegy.config';

/**
 * Authentication Middlewares
 */
export default class AuthMiddlewares {

    /**
     * Creates an express middleware function.
     *
     * It uses "passport.authenticate" to verify the JWT token from the authorization header with bearer schema.
     *
     * @returns {function}
     */
    static createAuthGuard = () => {
        return passport.authenticate(
            PassportJwtStrategy.name,
            { session: false },
            undefined,
        );
    };

    /**
     * Creates an express middleware function.
     *
     * It will compare the "requiredRights" with the rights from the JWT token payload.
     *
     * If there is a match it will call "next" and allow the incoming request to pass through.
     *
     * If there is no match will throw ApiError with status code of FORBIDDEN.
     *
     * Meant to be used after the "passport.authenticate" middleware.
     *
     * @param {Array<string>} requiredRights
     * @returns {function}
     */
    static createAccessGuard = (...requiredRights) => (req, res, next) => {
        let error;

        if (requiredRights.length) {
            const userRights = req.user.rights;

            const hasUserRequiredRights = requiredRights.every((requiredRight) => {
                return userRights.includes(requiredRight);
            });

            if (!hasUserRequiredRights) {
                error = ErrorExceptions.FORBIDDEN();
            }
        }

        next(error);
    };
}
