import app from './app';
import config from './config';

import bootstrap from 'core/bootstrap';

import { LoggerService } from 'core/logger';
import { MailerService } from 'core/mailer';
import { DatabaseService } from 'core/database';

let server = null;

bootstrap({
    modules: [
        MailerService,
        DatabaseService,
    ],
    startup: () => {
        server = app.listen(config.port, () => {
            LoggerService.logger.info(`[EXPRESS] Started server successfully and listening to port:  ${config.port}.`);
        });
    },
    cleanup: () => {
        if (server) {
            server.close(() => {
                LoggerService.logger.info('[EXPRESS] Server closed.');
            });
        }
    }
});
