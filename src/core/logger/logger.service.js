import { createWinstonLogger } from './configs/winston';

/**
 * Logger Service
 */
export default class LoggerService {

    /**
     * Winston logger instance.
     *
     * @type {Logger}
     */
    static logger = null;

    /**
     * Initializes the logger service.
     *
     * @return {Promise<void>}
     */
    static init = async () => {
        try {
            LoggerService.logger = createWinstonLogger();
            LoggerService.logger.info('[LOGGER] Logger initialized with success!');
        } catch (error) {
            console.error('[LOGGER]  Logger failed to be initialized, aborting process!');
            console.error(error);
            throw error;
        }
    };

    /**
     * Cleans up anything that "init" may setup.
     *
     * @return {Promise<void>}
     */
    static cleanup = async () => {
        if(LoggerService.logger) {
            LoggerService.logger.close();
        }

        LoggerService.logger = null;
    };
}
