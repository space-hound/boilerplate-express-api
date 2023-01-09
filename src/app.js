import express from 'express';
import helmet from 'helmet';
import helmetCSP from 'helmet-csp';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';

import { UserRouter } from 'features/user';
import { HealthRouter } from 'features/health';
import { AuthRouter, PassportJwtStrategy } from 'features/auth';

import { ErrorController, ErrorMiddlewares } from 'core/error';

const app = express();

const router = express.Router();

const routes = [
    {
        path: '/health',
        router: HealthRouter,
    },
    {
        path: '/auth',
        router: AuthRouter,
    },
    {
        path: '/user',
        router: UserRouter,
    }
];

// set security HTTP headers
app.use(helmet());

// set the csp
app.use(
    helmetCSP({
        useDefaults: true,
        directives: {
            /* eslint-disable quotes */
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            imgSrc: ["'self'"],
            /* eslint-enable quotes */
        },
        reportOnly: false,
    }),
);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(
    express.urlencoded({
        extended: true
    }),
);

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(
    cors({
        origin: true,
        credentials: true,
        'Access-Control-Allow-Origin': true,
        'Access-Control-Allow-Headers': true,
        'Access-Control-Expose-Headers': true,
        'Access-Control-Allow-Credentials': true,
    }),
);

// enable pre-flight
app.options('*', cors());

// enable passport
app.use(passport.initialize());

// configure passport
passport.use(
    PassportJwtStrategy.name,
    PassportJwtStrategy.strategy
);

// add locals to the req var
app.use((req, res, next) => {
    if (!req.locals) {
        req.locals = {};
    }
    next();
});

// configure router
routes.forEach((route) => {
    router.use(route.path, route.router);
});

// attach router
app.use('/api', router);

// attach not found controller
app.use(ErrorController.notFound);

// attach error converter
app.use(ErrorMiddlewares.converter);

// attach error handler
app.use(ErrorMiddlewares.handler);

export default app;
