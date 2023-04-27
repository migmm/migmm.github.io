import { Request, Response } from 'express';
import api from '../api/auth';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getAuth = async (req:Request, res:Response) => {
    const id:any = req.params.id;
    const auth = await api.getAuth(id);

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

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    let foundUser = await api.getAuth(username);

    console.log(foundUser)

    if(!foundUser || foundUser.id === undefined) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

 /*    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    } */

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const secretKey:string = process.env.ACCESS_TOKEN_SECRET as string;

    const accessToken = jwt.sign(
        { "username": foundUser.username },
        secretKey,
        { expiresIn: '1d' }
    );

    const cookieOptions:any = {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
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


export default {
    getAuth,
    postAuth,
    logout
};