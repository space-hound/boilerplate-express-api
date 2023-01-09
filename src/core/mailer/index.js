import MailerService from './mailer.service';

import { createNodemailerTransporter } from './configs/nodemailer';

import VerifyAccountEmailTemplate from './templates/verify-account-email.template';
import ResetPasswordEmailTemplate from './templates/reset-password-email.template';

export {
    MailerService,

    createNodemailerTransporter,

    VerifyAccountEmailTemplate,
    ResetPasswordEmailTemplate,
};
