import nodemailer from 'nodemailer';
import generateEmailContent from './emailContentGenerator';
import { smtpConfig, fromEmail } from '../config/smtpConfig';

const transporter = nodemailer.createTransport(smtpConfig);

const sendConfirmationEmail = (user: { id: number; email: string }): void => {
    const content = generateEmailContent(user);

    const mailOptions = {
        from: fromEmail,
        to: user.email,
        subject: 'Confirmation Email',
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
}

export default sendConfirmationEmail;