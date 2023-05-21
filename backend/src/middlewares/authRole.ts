import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import api from '../api/users';
import rolesPermissions from '../config/userRoles';

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
        console.log('roles', roles)

        // Ckeck if you have a token, if not, you are unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        // Decode token
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as UserPayload;
        req.currentUser = payload;

        //Find user in database with te ID in payload
        const userAuth = await api.getUser(payload.id as any);

        // From the ID taken from URL find the user
        const userFromID = await api.getUser(id);

        // Check if user exist, if not, throw error
        if (!userFromID) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // First check if user is admin or has required role specified in the route
        if (!roles.includes(userAuth.role)) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user is trying to modify their own information
        // If admin is logged just go on
        if (id && id !== userAuth.id && userAuth.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden.' });
        }

          // Check if user has permission to get
        if (req.body && req.method === 'GET' && !rolesPermissions[userAuth.role].canGet) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to update
        if (req.body && req.method === 'PUT' && !rolesPermissions[userAuth.role].canUpdate) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to delete
        if (req.method === 'DELETE' && !rolesPermissions[userAuth.role].canDelete) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // Check if user has permission to create
        if (req.body && req.method === 'POST' && !rolesPermissions[userAuth.role].canCreate) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // If banned property is in body
        // If Actual User is an Admin
        // Or if role permission can change banned status
        // User check is negation in order to throw an error if is true
        if (req.body.hasOwnProperty('banned') && (userAuth.role !== 'admin' || !rolesPermissions[userAuth.role].canBan)) {
            return res.status(403).json({ message: 'Forbidden.' });
        }

        // If role property is in body
        // If Actual User is an Admin
        // Or if role permission can change banned status
        // User check is negation in order to throw an error if is true
        if (req.body.hasOwnProperty('role') && (userAuth.role !== 'admin' || !rolesPermissions[userAuth.role].canBan)) {
            return res.status(403).json({ message: 'Forbidden 3' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default authRole;
