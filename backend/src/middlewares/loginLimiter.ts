import { Request, Response, NextFunction } from "express";
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 3,
    message:
        { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
        handler: (req:Request, res:Response, next:NextFunction, options:any) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, 
    legacyHeaders: false,
})

export default { 
    loginLimiter 
};