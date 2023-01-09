import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    envs: {
        isDev: process.env.NODE_ENV === 'development',
        isProd: process.env.NODE_ENV === 'production',
    },
    mongo: {
        url: process.env.MONGO_URL,
        options: {},
    },
    jwt: {
        AUTH: {
            secret: process.env.JWT_AUTH_SECRET,
            expiration: process.env.JWT_AUTH_EXPIRATION,
            expirationUnit: process.env.JWT_AUTH_EXPIRATION_UNIT || 'minutes',
        },
        REFRESH: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiration: process.env.JWT_REFRESH_EXPIRATION,
            expirationUnit: process.env.JWT_REFRESH_EXPIRATION_UNIT || 'days',
        },
        VERIFY_ACCOUNT: {
            secret: process.env.JWT_VERIFY_ACCOUNT_SECRET,
            expiration: process.env.JWT_VERIFY_ACCOUNT_EXPIRATION,
            expirationUnit: process.env.JWT_VERIFY_ACCOUNT_EXPIRATION_UNIT || 'minutes',
        },
        RESET_PASSWORD: {
            secret: process.env.JWT_RESET_PASSWORD_SECRET,
            expiration: process.env.JWT_RESET_PASSWORD_EXPIRATION,
            expirationUnit: process.env.JWT_RESET_PASSWORD_EXPIRATION_UNIT || 'minutes',
        },
    },
    email: {
        from: process.env.EMAIL_FROM,
        smtp: {
            host: process.env.EMAIL_SMTP_HOST,
            port: process.env.EMAIL_SMTP_PORT,
            auth: {
                user: process.env.EMAIL_SMTP_USERNAME,
                pass: process.env.EMAIL_SMTP_PASSWORD,
            },
        },
    },
    app: {
        link: process.env.APP_LINK,
    },
};

export default config;
