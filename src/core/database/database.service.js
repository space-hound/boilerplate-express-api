import mongoose from 'mongoose';

import config from 'config';

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
        mongoose.set('strictQuery', false);

        await mongoose.connect(
            config.mongo.url,
            config.mongo.options
        );
    };

    /**
     * Shuts down the database service.
     *
     * @returns {Promise<void>}
     */
    static shutdown = async () => {
        await mongoose.connection.close();
    };
}
