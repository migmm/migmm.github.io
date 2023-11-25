import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';

const createRequestLimiter = (maxAttempts: number, windowMinutes: number, message: string): RequestHandler => {
    const windowMs = windowMinutes * 60 * 1000;
    return rateLimit({
        windowMs,
        max: maxAttempts,
        message: { error: message },
        statusCode: 429,
        headers: true,
    });
};

export default createRequestLimiter;
