import { Request, Response } from 'express';
import api from '../api/resetPassword';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/bcryptHeper';


interface ResetTokenPayload {
    id: number;
    email: string;
    password: string;
}

export const resetPassword = async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    console.log(newPassword, resetToken)
    try {
        if (!resetToken || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must have at least 6 characters' });
        }

        const decodedToken = jwt.verify(resetToken, process.env.ACCESS_TOKEN_SECRET as string) as ResetTokenPayload;

        if (!decodedToken) {
            res.status(400).json({ error: 'Invalid or expired reset token' });
            return;
        }

        const foundUser = (await api.getUser(decodedToken.id)) as ResetTokenPayload;
        console.log('foundUser', foundUser);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const hashedPwd = await hashPassword(foundUser.password);
        foundUser.password = hashedPwd; 

        // Update password in database
        await api.updatePassword(decodedToken.id, foundUser);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while resetting the password' });
    }
};

export default resetPassword;