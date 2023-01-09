import express from 'express';

import { ValidationMiddlewares } from 'core/validation';

import { AuthMiddlewares } from 'features/auth';

import UserEnums from './user.enums';
import UserController from './user.controller';
import UserValidations from './user.validations';
import UserMiddlewares from './user.middlewares';

const UserRouter = express.Router();

/**
 * Method: GET
 * Path: /api/user/
 */
UserRouter.get(
    '/',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthMiddlewares.createAccessGuard(
        UserEnums.RIGHTS.GET_USERS,
    ),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.getUsers),
    UserController.getUsers
);

/**
 * Method: POST
 * Path: /api/user/
 */
UserRouter.post(
    '/',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthMiddlewares.createAccessGuard(
        UserEnums.RIGHTS.MANAGE_USERS,
    ),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.createUser),
    UserController.createUser
);

/**
 * Method: GET
 * Path: /api/user/:userId
 */
UserRouter.get(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthMiddlewares.createAccessGuard(
        UserEnums.RIGHTS.GET_USERS,
    ),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.getUser),
    UserController.getUser
);

/**
 * Method: PATCH
 * Path: /api/user/:userId
 */
UserRouter.patch(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthMiddlewares.createAccessGuard(
        UserEnums.RIGHTS.MANAGE_USERS,
    ),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.updateUser),
    UserController.updateUser
);

/**
 * Method: DELETE
 * Path: /api/user/:userId
 */
UserRouter.delete(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthMiddlewares.createAccessGuard(
        UserEnums.RIGHTS.MANAGE_USERS,
    ),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.deleteUser),
    UserController.deleteUser
);

export default UserRouter;
