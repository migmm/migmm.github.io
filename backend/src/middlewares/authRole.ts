import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import api from "../api/users";
import rolesPermissions from "../config/userRoles";


interface UserPayload {
    id: string;
    email: string;
    role: string;
}

const authRole = (roles: string[]) => async (req: Request & { currentUser: UserPayload }, res: Response, next: NextFunction) => {
    try {
        // Get JWT token from HTTPS Cookies and ID from URL
        const token = req.cookies.jwt;
        const id: any = req.params.id;

        // Ckeck if you have a token, if not, you are unauthorized
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Decode token
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as UserPayload;
        console.log("payload", payload);

        req.currentUser = payload;

        console.log("payload user", payload);
        console.log("payload user id", payload.id);

        const userAuth = await api.getUser(payload.id as any);
        console.log("Auth user from database", userAuth );
        console.log("Auth user from database", userAuth.role );

        // From the ID taken from URL find the user
        const userFromID = await api.getUser(id);
        console.log("user to modify from database", userFromID);

        // Check if user exist, if not, throw error
        if (!userFromID) {
            return res.status(404).json({ message: "User not found." });
        }

        console.log("Body from req",req.body)
        console.log("banned",req.body.banned)
        console.log("status banned", req.body.status === "banned")
        console.log("status property", req.body.hasOwnProperty('banned') )


         // First check if user is admin or has required role
        if (!roles.includes(userAuth.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

      /*   // Check if user is admin
        if (payload.role !== "admin" && !roles.includes(payload.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Check if user is trying to modify their own information
        if (req.params.id && req.params.id !== payload.id && payload.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        // Check if user is trying to modify the banned status
        if (req.body.status === "banned" && payload.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        } */

        // If banned property is in body
        // If Actual User is an Admin
        // Or if role permission can change banned status
        // User check is negation in order to throw an error if is true 
        console.log("-------------------------------------------------------------")
        console.log("status property banned", req.body.hasOwnProperty('banned'))
        console.log("User auth role", userAuth.role)
        console.log("User auth role is admin", userAuth.role === "admin")
        console.log("User with roles can ban", rolesPermissions[userAuth.role].canBan)
        console.log("-------------------------------------------------------------")
        if (req.body.hasOwnProperty('banned') && (userAuth.role !== "admin" || !rolesPermissions[userAuth.role].canBan)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.status(403).json({ message: "you are an admin" });

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export default authRole;
