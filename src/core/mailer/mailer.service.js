import config from 'config';

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
        MailerService.transporter = await createNodemailerTransporter();
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
