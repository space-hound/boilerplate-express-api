import { LoggerService } from 'core/logger';

const PROCESS_EVENTS = [
    {
        code: 0,
        level: 'info',
        name: 'SIGUSR1',
    },
    {
        code: 0,
        level: 'info',
        name: 'SIGUSR2'
    },
    {
        code: 0,
        level: 'info',
        name: 'SIGINT'
    },
    {
        code: 0,
        level: 'info',
        name: 'SIGTERM'
    },
    {
        code: 1,
        level: 'error',
        name: 'uncaughtException'
    },
    {
        code: 1,
        level: 'error',
        name: 'unhandledRejection'
    },
];

export default async ({ modules, startup, cleanup }) => {
    PROCESS_EVENTS.forEach(({ code, level, name }) => {
        process.on(name, (error) => {
            cleanup();

            LoggerService.logger[level](`[PROCESS] ${name} received.`);

            if(error) {
                LoggerService.logger[level](error);
            }

            for (const module of modules) {
                module.cleanup();
            }

            process.exit(code);
        });
    });

    for (const module of modules) {
        await module.init();
    }

    startup();
};
