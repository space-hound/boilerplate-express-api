import winston from 'winston';

import config from 'config';

/**
 * Creates and configure a winston logger instance.
 *
 * @return {Logger}
 */
export const createWinstonLogger = () => {
    const logger = winston.createLogger({
        maxSize: '25m',
        maxFiles: '9',
        level: config.envs.isDev ? 'debug' : 'info',
        format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf((info) => {
                        const { timestamp, level, message, stack } = info;
                        return `${timestamp} ${level} \n ${stack || message} \n`;
                    }),
                )
            }),
        ],
    });

    if (config.envs.isProd) {
        logger.add(
            new winston.transports.File({
                level: 'error',
                filename: 'logs/error.log',
                format: winston.format.combine(
                    winston.format.prettyPrint(),
                ),
            }),
        );
        logger.add(
            new winston.transports.File({
                level: 'info',
                filename: 'logs/info.log',
                format: winston.format.combine(
                    winston.format.prettyPrint(),
                ),
            }),
        );
        logger.add(
            new winston.transports.File({
                filename: 'logs/combined.log',
                format: winston.format.combine(
                    winston.format.prettyPrint(),
                ),
            }),
        );
    }

    return logger;
};
