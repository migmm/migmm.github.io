import { Request, Response, NextFunction, RequestHandler } from "express";
import rateLimit from "express-rate-limit";

const loginLimiter: RequestHandler = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: {
        message: "Too many login attempts from this IP, please try again after a 60 second pause",
    },
    handler: (req: Request, res: Response, _next: NextFunction) => {
        const rateLimitMessage = (req as any).rateLimit.message;
        res.status(429).json({ error: rateLimitMessage });
    },
    statusCode: 429,
    headers: true,
});

export default loginLimiter;
