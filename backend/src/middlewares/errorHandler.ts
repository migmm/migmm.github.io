import { Request, Response, NextFunction } from 'express';

export function errorHandler(_req: Request, res: Response, _next: NextFunction) {
    res.status(500).send({ error: 'Internal server error' });
}
