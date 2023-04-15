import { Request, Response } from 'express';
import api from '../api/users';


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getUsers = async (_req:Request, res:Response) => {
    const users = await api.getUsers();

    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error getting users')
    }

};

const getUser = async (req:Request, res:Response) => {
    const id:any = req.params.id;
    const user = await api.getUser(id);

    try {
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error getting user')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postUser = async (req:Request, res:Response) => {
    let user = req.body;

    try {
        const newUser = await api.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send('Error posting users')
    }
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putUser = async (req:Request, res:Response) => {
    const id:any = req.params.id;
    const user = req.body;

    try {
        const updatedUser = await api.updateUser(id, user) || {};
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteUser = async (req:Request, res:Response) => {
    const id:any = req.params.id;

    try {
        const removedUser = await api.deleteUser(id) || {};
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(500).send('Error removing user')
    }

};


export default {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
};
