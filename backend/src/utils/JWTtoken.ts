import jwt from 'jsonwebtoken';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const ACCESS_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';


// USAGE 
// const token = generateToken(user, '2h', ACCESS_TOKEN_SECRET);
const generateToken = (user: { id: string; role: string }, expiresIn: string = '1h', type: string = ACCESS_TOKEN_SECRET): string => {
    try {
        const payload = {
            id: user.id,
            email: user.role,
        };

        const token = jwt.sign(payload, type, { expiresIn });

        return token;
    } catch (error: any) {
        // Handle the error, log it, or throw a more specific error if needed
        console.error(`Error generating token: ${error.message}`);
        throw new Error('Failed to generate token');
    }
};

// USAGE 
// const verifyToken = verifyToken(token, REFRESH_TOKEN_SECRET);
const verifyToken = async (token: string, refreshTokenSecret: string): Promise<any> => {
    try {
        const decodedToken = jwt.verify(token, refreshTokenSecret);
        return decodedToken;
    } catch (error) {
        throw error;
    }
};


export {
    generateToken,
    verifyToken
};