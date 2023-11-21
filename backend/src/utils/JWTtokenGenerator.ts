import jwt from 'jsonwebtoken';

import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();


// USAGE 
// const token = generateToken(user, '2h');
const generateToken = (user: { id: String; email: string }, expiresIn: string = '1h'): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET as string;

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
};


export default generateToken;