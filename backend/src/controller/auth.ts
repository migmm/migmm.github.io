import { Request, Response } from 'express';
import api from '../api/users';
import bcrypt from "bcrypt";

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getAuths = async (_req:Request, res:Response) => {
    const auths = await api.getAuths();

    try {
        res.status(200).json(auths);
    } catch (error) {
        res.status(500).send('Error getting auths')
    }

};

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
    const { authname, password } = req.body

    if (!authname || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundAuth = await api.getAuth(authname);
    console.log(foundAuth)
    if (!foundAuth) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundAuth.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })


    res.status(201).json(foundAuth);
console.log(foundAuth)
    /* try {
        const newAuth = await api.createAuth(auth);
        res.status(201).json(newAuth);
    } catch (error) {
        res.status(500).send('Error posting auths')
    } */
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putAuth = async (req:Request, res:Response) => {
    const id:any = req.params.id;
    const auth = req.body;

    try {
        const updatedAuth = await api.updateAuth(id, auth) || {};
        res.status(200).json(updatedAuth);
    } catch (error) {
        res.status(500).send('Error updating auth')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteAuth = async (req:Request, res:Response) => {
    const id:any = req.params.id;

    try {
        const removedAuth = await api.deleteAuth(id) || {};
        res.status(200).json(removedAuth);
    } catch (error) {
        res.status(500).send('Error removing auth')
    }

};


export default {
    getAuths,
    getAuth,
    postAuth,
    putAuth,
    deleteAuth,
};