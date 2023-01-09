import express from 'express';

import { ValidationMiddlewares } from 'core/validation';

import { UserMiddlewares } from 'features/user';

import AuthController from './auth.controller';
import AuthValidations from './auth.validations';
import AuthMiddlewares from './auth.middlewares';

const AuthRouter = express.Router();

/**
 * Method: POST
 * Path: /api/auth/register
 */
AuthRouter.post(
    '/register',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.register),
    AuthController.register
);

/**
 * Method: POST
 * Path: /api/auth/login
 */
AuthRouter.post(
    '/login',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.login),
    AuthController.login
);

/**
 * Method: POST
 * Path: /api/auth/logout
 */
AuthRouter.post(
    '/logout',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.logout),
    AuthController.logout
);

/**
 * Method: POST
 * Path: /api/auth/refresh
 */
AuthRouter.post(
    '/refresh',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.refresh),
    AuthController.refresh,
);

/**
 * Method: POST
 * Path: /api/auth/send-verify-account-email
 */
AuthRouter.post('/send-verify-account-email',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.sendVerifyAccountEmail),
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    AuthController.sendVerifyAccountEmail,
);

/**
 * Method: POST
 * Path: /api/auth/verify-account
 */
AuthRouter.post(
    '/verify-account',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.verifyAccount),
    AuthController.verifyAccount
);

/**
 * Method: POST
 * Path: /api/auth/send-reset-password-email
 */
AuthRouter.post(
    '/send-reset-password-email',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.sendResetPasswordEmail),
    UserMiddlewares.createMountUserFromBodyEmail(),
    AuthController.sendResetPasswordEmail
);

/**
 * Method: POST
 * Path: /api/auth/reset-password
 */
AuthRouter.post(
    '/reset-password',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.resetPassword),
    AuthController.resetPassword
);

export default AuthRouter;
