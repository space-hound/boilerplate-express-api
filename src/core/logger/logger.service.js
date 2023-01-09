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
        LoggerService.logger = createWinstonLogger();
    };
}
