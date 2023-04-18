import { Request, Response } from 'express';
import api from '../api/auth';
import bcrypt from "bcrypt";
//import jwt from 'jsonwebtoken';
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

    const foundUser = await api.getAuth(username);

    console.log(foundUser)
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    res.status(201).json(foundUser); 

};


export default {
    getAuth,
    postAuth,
};