import nodemailer from 'nodemailer';
import { smtpConfig, fromEmail } from '../config/smtpConfig';

const transporter = nodemailer.createTransport(smtpConfig);


/*
 * Function to send mail
 * @param {string} email - The email to send the message
 * @param {string} subject - The subject of the mail
 * @param {string} content - The content of the mail
 * @returns {void}
 */

const sendMail= async (email: string, subject: string, content: string): Promise<void> => {
    try {
        const mailOptions = {
            from: fromEmail,
            to: email,
            subject: subject,
            html: content,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
        throw new Error('Error sending email');
    }
};


export default sendMail;