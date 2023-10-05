import * as dotenv from 'dotenv';
dotenv.config();


const smtpConfig = {
    provider: 'smtp',
    auth: {
        user: process.env.SMTP_SENDER_EMAIL,
        pass: process.env.SMTP_SENDER_EMAIL_PASSWORD,
    },
    host: process.env.SMTP_SENDER_HOST,
    port: 465,
    secure: true,
};

const fromEmail = 'contact@miguedev.com';

export { smtpConfig, fromEmail };
