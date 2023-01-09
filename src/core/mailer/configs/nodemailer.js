import nodemailer from 'nodemailer';

import config from 'config';

/**
 * Creates and verify a nodemailer transporter.
 *
 * @return {Promise<Mail>}
 */
export const createNodemailerTransporter = async () => {
    const transporter = nodemailer.createTransport(config.email.smtp);

    const error = await transporter.verify();

    if(error) {
        throw error;
    }

    return transporter;
};
