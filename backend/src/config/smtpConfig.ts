import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load(); 


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

const fromEmail = process.env.SMTP_SENDER_FROM;

export { smtpConfig, fromEmail };
