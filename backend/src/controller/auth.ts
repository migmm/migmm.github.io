import { Request, Response } from 'express';
import api from '../api/auth';
import { comparePasswords } from '../utils/bcryptHeper';
import jwt from 'jsonwebtoken';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();


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

const getAuth = async (_req:Request, res:Response) => {
    //const id:any = req.params.id;
    const auth = await api.getAuth('username', 'username');
    console.log('auth controller', auth)
    try {
        res.status(200).json(auth);
    } catch (error) {
        res.status(500).send('Error getting auth')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postAuth = async (req:Request, res:Response) => {
    const { username, password } = req.body
    console.log(username, password)
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await api.getAuth('username',username) as User; 
    console.log('user auth', foundUser);
    
    if(!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await comparePasswords(password, foundUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const secretKey:string = process.env.ACCESS_TOKEN_SECRET as string;

    const accessToken = jwt.sign(
        {  'id' : foundUser.id },
        secretKey,
        { expiresIn: '1d' }
    );

    const cookieOptions:any = {
        //httpOnly: true,
        sameSite: 'none',
        //secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res.cookie('jwt', accessToken, cookieOptions).status(201).json({ accessToken });
};


const logout = async (req:Request, res:Response) => {
    const cookies = await req.cookies;
    console.log(req.cookies);

    console.log('cookies',cookies)

    if (!cookies?.jwt) return res.sendStatus(204) 

    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: 'none', 
        secure: true 
    })

    res.json({ message: 'Cookie cleared' })
}

const test = async (_req:Request, res:Response) => {
    return res.status(401).json({ message: 'Test message' })
}


export default {
    getAuth,
    postAuth,
    logout,
    test
};