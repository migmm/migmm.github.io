import { Request, Response, NextFunction } from 'express';

const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something gos wrong.');
};

export default errorHandler;
