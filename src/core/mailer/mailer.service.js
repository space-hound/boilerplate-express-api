import config from 'config';

import { LoggerService } from 'core/logger';

import { createNodemailerTransporter } from './configs/nodemailer';

import VerifyAccountEmailTemplate from './templates/verify-account-email.template';
import ResetPasswordEmailTemplate from './templates/reset-password-email.template';

/**
 * Mailer Service
 */
export default class MailerService {

    /**
     * The nodemailer transporter instance.
     *
     * @type {Mail}
     */
    static transporter = null;

    /**
     * Initializes the mailer service.
     *
     * @return {Promise<void>}
     */
    static init = async () => {
        try {
            MailerService.transporter = await createNodemailerTransporter();
            LoggerService.logger.info('[MAILER] Mailer initialized with success!');
        } catch (error) {
            LoggerService.logger.error('[MAILER] Mailer failed to be initialized, aborting process!');
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
        MailerService.transporter = null;
    };

    /**
     * Sends an email.
     *
     * @param {string} to
     * @param {string} subject
     * @param {string} text
     * @returns {Promise<void>}
     */
    static sendMail = async (to, subject, text) => {
        await MailerService.transporter.sendMail({
            to,
            from: config.email.from,
            subject,
            text,
        });
    };

    /**
     * Sends a verification account email.
     *
     * @param {string} to
     * @param {string} verifyAccountToken
     * @returns {Promise<void>}
     */
    static sendVerifyAccountEmail = async (to, verifyAccountToken) => {
        await MailerService.sendMail(
            to,
            VerifyAccountEmailTemplate.subject,
            VerifyAccountEmailTemplate.text(
                `${config.app.link}/verify-email?token=${verifyAccountToken}`
            )
        );
    };

    /**
     * Sends a reset password email.
     *
     * @param {string} to
     * @param {string} resetPasswordToken
     * @returns {Promise<void>}
     */
    static sendResetPasswordEmail = async (to, resetPasswordToken) => {
        await MailerService.sendMail(
            to,
            ResetPasswordEmailTemplate.subject,
            ResetPasswordEmailTemplate.text(
                `${config.app.link}/reset-password?token=${resetPasswordToken}`
            ),
        );
    };
}
