import nodemailer from "nodemailer";
import generateEmailContent from "./emailContentGenerator";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
    },
});

const sendConfirmationEmail = (user: { id: number; email: string }): void => {
    const content = generateEmailContent(user);

    const mailOptions = {
        from: "your-email@example.com",
        to: user.email,
        subject: "Confirmation Email",
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