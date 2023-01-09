import { AsyncUtils } from 'shared/utilities';

import { ErrorExceptions } from 'core/error';

import UserService from './user.service';
import UserExceptions from './user.exceptions';

/**
 * User Middlewares
 */
export default class UserMiddlewares {

    /**
     * Creates an express middleware function.
     *
     * Uses the user id from the JWT token payload to query the database for that user.
     *
     * If found, it will attach the user document to the "request.locals.user".
     *
     * If not found will throw ApiError with status code of UNAUTHORIZED.
     *
     * Meant to be used after the "passport.authenticate" middleware.
     *
     * @returns {function}
     */
    static createMountUserFromToken = () => AsyncUtils.asyncHandler(async (req, res, next) => {
        const userDoc = await UserService.getUserById(req.user.id);

        if (!userDoc) {
            throw ErrorExceptions.UNAUTHORIZED();
        }

        req.locals.user = userDoc;

        next();
    });

    /**
     * Creates an express middleware function.
     *
     * Uses the user email from the request body to query the database for that user.
     *
     * If found, it will attach the user document to the "request.locals.user".
     *
     * If not found will throw ApiError with status code of USER_NOT_FOUND.
     *
     * @returns {function}
     */
    static createMountUserFromBodyEmail = () => AsyncUtils.asyncHandler(async (req, res, next) => {
        const userDoc = await UserService.getUserByEmail(req.body.email);

        if (!userDoc) {
            throw UserExceptions.USER_NOT_FOUND();
        }

        req.locals.user = userDoc;

        next();
    });
}
