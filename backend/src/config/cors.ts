import dotEnvExtended from 'dotenv-extended';
dotEnvExtended.load();


const allowedOrigin = process.env.ALLOWED_ORIGIN;
const allowedOrigins = [allowedOrigin];


//const allowedOrigins = ['*'];

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;