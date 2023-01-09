import { LoggerService } from 'core/logger';
import { MailerService } from 'core/mailer';
import { DatabaseService } from 'core/database';

import config from './config';
import app from './app';

let server = null;

const modules = [
    {
        handler: LoggerService.init,
        onSuccess: () => {
            LoggerService.logger.info('[LOGGER] Logger initialized with success!');
        },
        onError: (error) => {
            console.error('[LOGGER]  Logger failed to be initialized, aborting process!');
            console.error(error);
        },
    },
    {
        handler: MailerService.init,
        onSuccess: () => {
            LoggerService.logger.info('[MAILER] Mailer initialized with success!');
        },
        onError: (error) => {
            LoggerService.logger.error('[MAILER] Mailer failed to be initialized, aborting process!');
            LoggerService.logger.error(error);
        },
    },
    {
        handler: DatabaseService.init,
        onSuccess: () => {
            LoggerService.logger.info('[DATABASE] Database initialized with success!');
        },
        onError: (error) => {
            LoggerService.logger.error('[DATABASE] Database failed to be initialized, aborting process!');
            LoggerService.logger.error(error);
        },
    },
];

const bootstrap = async () => {
    for (const { handler, onSuccess, onError } of modules) {
        try {
            await handler();
            onSuccess();
        } catch (error) {
            onError(error);
            process.exit(1);
        }
    }
};

const cleanup = (callback) => {
    DatabaseService.shutdown().then(() => {
        LoggerService.logger.info('[DATABASE] Database connection closed.');
    });

    if (server) {
        server.close(() => {
            LoggerService.logger.info('[EXPRESS] Server closed.');
            callback && callback();
        });
    } else {
        callback && callback();
    }
};

process.on('SIGUSR1', () => {
    LoggerService.logger.info('[PROCESS] SIGUSR1 received.');
    cleanup(() => {
        process.exit(0);
    });
});

process.on('SIGUSR2', () => {
    LoggerService.logger.info('[PROCESS] SIGUSR2 received.');
    cleanup(() => {
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    LoggerService.logger.info('[PROCESS] SIGINT received.');
    cleanup(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    LoggerService.logger.info('[PROCESS] SIGTERM received.');
    cleanup(() => {
        process.exit(0);
    });
});

process.on('uncaughtException', (error) => {
    LoggerService.logger.error('[PROCESS] uncaughtException received.');
    LoggerService.logger.error(error);
    cleanup(() => {
        process.exit(1);
    });
});

process.on('unhandledRejection', (error) => {
    LoggerService.logger.error('[PROCESS] unhandledRejection received.');
    LoggerService.logger.error(error);
    cleanup(() => {
        process.exit(1);
    });
});

bootstrap().then(() => {
    server = app.listen(config.port, () => {
        LoggerService.logger.info(`[EXPRESS] Started server successfully and listening to port:  ${config.port}.`);
    });
});

