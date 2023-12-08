import jwt from 'jsonwebtoken';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const ACCESS_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';


/**
 * Generates a JSON Web Token (JWT) based on the provided user information.
 *
 * @param {Object} user - User information including id and role.
 * @param {string} [expiresIn='1h'] - Expiration time for the token. Default is 1 hour.
 * @param {string} [type=ACCESS_TOKEN_SECRET] - Type of token to generate. Default is access token.
 * @returns {string} - The generated JWT.
 */
const generateToken = (user: { id: string; role: string }, expiresIn: string = '1h', type: string = ACCESS_TOKEN_SECRET): string => {
    try {
        const payload = {
            id: user.id,
            email: user.role,
        };

        const token = jwt.sign(payload, type, { expiresIn });

        return token;
    } catch (error: any) {
        console.error(`Error generating token: ${error.message}`);
        throw new Error('Failed to generate token');
    }
};

/**
 * Verifies a JSON Web Token (JWT) using the provided token and secret.
 *
 * @param {string} token - The JWT to verify.
 * @param {string} refreshTokenSecret - The secret key used to verify the token.
 * @returns {Promise<any>} - A Promise that resolves to the decoded token if verification is successful.
 * @throws {Error} - Throws an error if the verification fails.
 */
const verifyToken = async (token: string, refreshTokenSecret: string): Promise<any> => {
    try {
        const decodedToken = jwt.verify(token, refreshTokenSecret);
        return decodedToken;
    } catch (error) {
        throw Error('Failed to verify');
    }
};


export {
    generateToken,
    verifyToken
};