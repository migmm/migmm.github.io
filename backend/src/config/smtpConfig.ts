import * as dotenv from 'dotenv';
dotenv.config();

const smtpConfig = {
    provider: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
    },
};

const fromEmail = 'contact@fromEmail.com';

export {
    smtpConfig,
    fromEmail,
} ;
