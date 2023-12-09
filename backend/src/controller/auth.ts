import { Request, Response } from 'express';
import api from '../api/auth';
import dotEnvExtended from 'dotenv-extended';
import { comparePasswords } from '../utils/bcryptHeper';
import parseDurationToMilliseconds from '../utils/parseDurationToMilliseconds';
import { generateToken, verifyToken } from '../utils/JWTtoken';

dotEnvExtended.load();

const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';
const ACCESS_TOKEN_EXPIRATION: string = process.env.ACCESS_TOKEN_EXPIRATION || '';
const REFRESH_TOKEN_EXPIRATION: string = process.env.REFRESH_TOKEN_EXPIRATION || '';
const COOKIE_NAME: string = process.env.COOKIE_NAME || '';
const HTTP_ONLY: string = process.env.HTTP_ONLY || '';
const SAME_SITE: string = process.env.SAME_SITE || '';
const SECURE: string = process.env.SECURE || '';
const MAX_AGE = parseDurationToMilliseconds(process.env.MAX_AGE || '');

const cookieOptions: object = {
    httpOnly: HTTP_ONLY,
    sameSite: SAME_SITE,
    secure: SECURE,
    maxAge: MAX_AGE,
};


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getAuth = async (_req: Request, res: Response) => {
    const auth = await api.getAuth('username', 'username');
    console.log('auth controller', auth);

    try {
        res.status(200).json(auth);
    } catch (error) {
        res.status(500).send('Error getting auth');
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const foundUser = await api.getAuth('username', username);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const match = await comparePasswords(password, foundUser.password);

        if (!match) return res.status(401).json({ message: 'Unauthorized' });

        const accessToken = generateToken(
            {
                id: foundUser.id,
                role: foundUser.role,
            },
            ACCESS_TOKEN_EXPIRATION
        );

        const refreshToken = generateToken(
            {
                id: foundUser.id,
                role: foundUser.role,
            },
            REFRESH_TOKEN_EXPIRATION,
            REFRESH_TOKEN_SECRET
        );

        foundUser.lastLogin = new Date();
        await api.updateUser(foundUser.id, foundUser);

        res.cookie(COOKIE_NAME, accessToken, cookieOptions);

        return res.cookie(COOKIE_NAME, refreshToken, cookieOptions).status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies?.[COOKIE_NAME];

    try {
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decodedToken = await verifyToken(token, REFRESH_TOKEN_SECRET);
        
        const foundUser = await api.getAuth('_id', decodedToken.id);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const newAccessToken = generateToken(
            { 
                id: foundUser.id, 
                role: foundUser.role 
            }, 
            REFRESH_TOKEN_EXPIRATION, 
            REFRESH_TOKEN_SECRET
        );

        foundUser.lastLogin = new Date();
        await api.updateUser(foundUser.id, foundUser);

        res.cookie(COOKIE_NAME, newAccessToken, cookieOptions).status(201).json({ refreshToken: newAccessToken });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error: Error refreshing token.' });
    }
};

const logout = async (req: Request, res: Response) => {
    const cookies = await req.cookies;

    try {
        if (!cookies?.jwt) {
            return res.status(204).json({ error: 'Cookie not found' });
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: HTTP_ONLY,
            sameSite: SAME_SITE,
            secure: SECURE,
        } as object);

        return res.status(200).json({ message: 'Cookie cleared' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default {
    getAuth,
    login,
    refreshToken,
    logout,
};
