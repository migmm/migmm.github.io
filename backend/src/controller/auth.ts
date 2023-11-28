import { Request, Response } from 'express';
import api from '../api/auth';
import { comparePasswords } from '../utils/bcryptHeper';
import jwt from 'jsonwebtoken';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();


const cookieName: string = process.env.COOKIE_NAME || 'jwt';
const HTTP_ONLY = process.env.HTTP_ONLY;
const SAME_SITE = process.env.SAME_SITE;
const SECURE = process.env.SECURE;
const MAX_AGE = parseDurationToMilliseconds(process.env.MAX_AGE || '');

interface User {
    id: string;
    username: string;
    name: string;
    password: string;
    role: string;
    banned: string;
}


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

const postAuth = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const foundUser = (await api.getAuth('username', username)) as User;
        console.log('user auth', foundUser);

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const match = await comparePasswords(password, foundUser.password);

        if (!match) return res.status(401).json({ message: 'Unauthorized' });

        const secretKey: string = process.env.ACCESS_TOKEN_SECRET as string;

        const accessToken = jwt.sign({ id: foundUser.id }, secretKey, { expiresIn: '1d' });

        console.log(process.env.HTTP_ONLY);
        const cookieOptions: any = {
            httpOnly: HTTP_ONLY,
            sameSite: SAME_SITE,
            secure: SECURE,
            maxAge: MAX_AGE,
        };

        return res.cookie(cookieName, accessToken, cookieOptions).status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const logout = async (req: Request, res: Response) => {
    const cookies = await req.cookies;
    console.log(req.cookies);

    console.log('cookies', cookies);

    try {
        if (!cookies?.jwt) {
            return res.status(204).json({ error: 'Cookie not found' });
        }

        res.clearCookie(cookieName, {
            httpOnly: HTTP_ONLY,
            sameSite: SAME_SITE,
            secure: SECURE,
        } as any);

        return res.status(200).json({ message: 'Cookie cleared' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

function parseDurationToMilliseconds(durationString: string) {
    const match = durationString.match(/^(\d+)([smhd])$/);

    if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2];

        switch (unit) {
            case 's':
                return value * 1000;
            case 'm':
                return value * 60 * 1000;
            case 'h':
                return value * 60 * 60 * 1000;
            case 'd':
                return value * 24 * 60 * 60 * 1000;
            default:
                return 0;
        }
    }
    return 0;
}


export default {
    getAuth,
    postAuth,
    logout,
};
