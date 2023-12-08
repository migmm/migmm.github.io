import jwt from 'jsonwebtoken';

import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();


// USAGE 
// const token = generateToken(user, '2h', ACCESS_TOKEN_SECRET);
const generateToken = (user: { id: String; role: string }, expiresIn: string = '1h', type: string = 'ACCESS_TOKEN_SECRET'): string => {
    const payload = {
        id: user.id,
        email: user.role,
    };

    const token = jwt.sign(payload, type, { expiresIn });

    return token;
};


export default generateToken;