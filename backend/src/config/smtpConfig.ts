import * as dotenv from 'dotenv';
dotenv.config();

const smtpConfig = {
    provider: 'gmail',
    auth: {
        user: process.env.SMTP_SENDER_EMAIL,
        pass: process.env.SMTP_SENDER_EMAIL_PASSWORD,
    },
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
};

const fromEmail = 'contact@fromEmail.com';

export { smtpConfig, fromEmail };
