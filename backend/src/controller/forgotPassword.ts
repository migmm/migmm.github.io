import { Request, Response } from 'express';
import sendMail from '../utils/mailSender';
import { generatePasswordResetEmailContent } from '../utils/emailContentGenerator';
import generateToken from '../utils/JWTtokenGenerator';
import api from '../api/forgotPassword';
import { User } from '../interface/forgotPassword'


const sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const foundUser = (await api('email', email)) as User;
        console.log('User found', foundUser);

        if (!foundUser) {
            return res.status(404).json({ message: 'Email not found in database' });
        }

        // Generate password reset token
        const token = generateToken({ id: foundUser.id, email: foundUser.email }, '1h');

        // Generate email content
        const content = generatePasswordResetEmailContent('Password reset', token);

        // Send email
        await sendMail(email, 'Password reset', content);

        res.status(200).json({ message: 'An email has been sent to reset your password' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error requesting password reset' });
    }
};

export default sendPasswordResetEmail;
