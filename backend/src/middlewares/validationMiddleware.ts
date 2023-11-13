import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validationMiddleware = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;
        const validationError = schema.validate(data);

        if (validationError.error) {
            console.error(validationError.error.details[0].message);
            return res.status(400).json({ error: 'Error validating.' });
        }

        next();
    };
};

export default validationMiddleware;