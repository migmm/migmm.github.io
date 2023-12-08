import jwt from 'jsonwebtoken';

import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

// USAGE 
// const token = generateToken(user, '2h');
const generateToken = (user: { id: String; role: string }, expiresIn: string = '1h'): string => {
    const payload = {
        id: user.id,
        email: user.role,
    };

    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });

    return token;
};


export default generateToken;