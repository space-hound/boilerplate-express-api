import mongoose from 'mongoose';

import config from 'config';

import { LoggerService } from 'core/logger';

/**
 * Database Service
 */
export default class DatabaseService {

    /**
     * Initialize the database service.
     *
     * @returns {Promise<void>}
     */
    static init = async () => {
        try {
            mongoose.set('strictQuery', false);

            await mongoose.connect(
                config.mongo.url,
                config.mongo.options
            );

            LoggerService.logger.info('[DATABASE] Database initialized with success!');
        } catch (error) {
            LoggerService.logger.error('[DATABASE] Database failed to be initialized, aborting process!');
            LoggerService.logger.error(error);
            throw error;
        }
    };

    /**
     * Cleans up anything that "init" may setup.
     *
     * @return {Promise<void>}
     */
    static cleanup = async () => {
        await mongoose.connection.close();
    };
}
