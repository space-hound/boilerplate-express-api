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
    static logger = createWinstonLogger();

}
