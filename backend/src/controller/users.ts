import { Request, Response } from "express";
import bcrypt from "bcrypt";

import api from "../api/users";

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getUsers = async (_req: Request, res: Response) => {
    const users = await api.getUsers();

    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Error getting users");
    }
};

const getUser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const user = await api.getUser(id);

    try {
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Error getting user");
    }
};

///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postUser = async (req: Request, res: Response) => {
    const user = req.body;

    if (!user.username || !user.password || !user.email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await api.getByField("username", user.username);
    const foundEmail = await api.getByField("email", user.email);

    if (foundUser) {
        return res.status(401).json({ message: "Existing username" });
    }

    if (foundEmail) {
        return res.status(401).json({ message: "Existing email" });
    }

    const hashedPwd = await bcrypt.hash(user.password, 10);
    user.password = hashedPwd;

    try {
        const newUser = await api.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send("Error posting users");
    }
};

//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putUser = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const { email, password } = req.body;
    try {
        const user = await api.getUser(id);
        console.log ("user", user)

        // Check if user exist
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        console.log("email", email, user.email)
        console.log("password", password, user.password)

        
        // Check if password is different than actual
        if (password == user.password) {
            return res.status(400).json({ message: "Password is the same that stored in database." });
        }
        user.password = password;
    
        // Check if email is different than actual
        if (email == user.email) {
            return res.status(400).json({ message: "Email is the same that stored in database." });
        }
        
        // Check if email exist in database
        const foundEmail = await api.getByField("email", email);
        console.log ("email", foundEmail)

        if (foundEmail) {
            return res.status(400).json({ message: "Email exist in database." });
        }
        user.email = email;

        const updatedUser = (await api.updateUser(id, user)) || {};
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send("Error updating user");
    }
};

///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteUser = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
        const removedUser = (await api.deleteUser(id)) || {};
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(500).send("Error removing user");
    }
};

export default {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
};
