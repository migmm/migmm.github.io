import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import allowedRoles from "../config/userRoles";
import api from "../api/auth";

interface TokenPayload {
    id: string;
    role: string;
}

interface RequestWithUser extends ExpressRequest {
    user: TokenPayload;
}

interface AuthPayload {
    id: string;
    role: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    password: string;
    // Otras propiedades necesarias
}

function authRole(roles: string[]) {
    return async function (req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as AuthPayload;

            if (!decoded || !decoded.id || !decoded.role) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const foundUser = (await api.getAuth("id", decoded.id)) as User;

            if (!foundUser) {
                console.log("foundUser", foundUser);
                return res.status(401).json({ message: "Unauthorized" });
            }

            const passwordMatch = await bcrypt.compare(foundUser.password, decoded.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (roles && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            req.user = decoded as TokenPayload;

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default authRole;
