import nodemailer from 'nodemailer';
import { smtpConfig, fromEmail } from '../config/smtpConfig';


const transporter = nodemailer.createTransport(smtpConfig);

// USAGE
// sendmail(email, subject, content)
const sendMail= async (email: string, subject: string, content: string): Promise<void> => {
    try {
        const mailOptions = {
            from: fromEmail,
            to: email,
            subject: subject,
            html: content,
        };
        console.log(mailOptions)
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
        throw new Error('Error sending email');
    }
};

export default sendMail;