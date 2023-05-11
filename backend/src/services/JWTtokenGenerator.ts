import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()


const generateToken = (user: { id: number; email: string }): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
    const expiresIn = '1h';

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}

export default generateToken;