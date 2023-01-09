import httpStatus from 'http-status';

import { AsyncUtils } from 'shared/utilities';

import UserService from './user.service';
import UserExceptions from './user.exceptions';

/**
 * User Controller
 */
export default class UserController {

    /**
     * Method: GET
     *
     * Path: /api/user/
     */
    static getUsers = AsyncUtils.asyncHandler(async (req, res) => {
        const userDocs = await UserService.getUsers();

        res.send(userDocs);
    });

    /**
     * Method: POST
     *
     * Path: /api/user/
     */
    static createUser = AsyncUtils.asyncHandler(async (req, res) => {
        const userDoc = await UserService.createUser(req.body);

        res.status(httpStatus.CREATED).send(userDoc);
    });

    /**
     * Method: GET
     *
     * Path: /api/user/:userId
     *
     * @throws {ApiError} - USER_NOT_FOUND
     */
    static getUser = AsyncUtils.asyncHandler(async (req, res) => {
        const userDoc = await UserService.getUserById(req.params.userId);

        if (!userDoc) {
            throw UserExceptions.USER_NOT_FOUND();
        }

        res.send(userDoc);
    });

    /**
     * Method: PATCH
     *
     * Path: /api/user/:userId
     */
    static updateUser = AsyncUtils.asyncHandler(async (req, res) => {
        const userDoc = await UserService.updateUserById(req.params.userId, req.body);

        res.send(userDoc);
    });

    /**
     * Method: DELETE
     *
     * Path: /api/user/:userId
     */
    static deleteUser = AsyncUtils.asyncHandler(async (req, res) => {
        await UserService.deleteUserById(req.params.userId);

        res.status(httpStatus.NO_CONTENT).send();
    });
}
