import * as dotenv from 'dotenv'
dotenv.config()

const PERSISTENCE_TYPES = {
    TYPE_MONGODB: 'MONGODB',
};

const databaseMongoDB = {
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,
    MONGODB_CONNECTION_STR: process.env.MONGODB_STRING,
    MONGODB_TIMEOUT: 30000
};

export {
    PERSISTENCE_TYPES,
    databaseMongoDB as default
};
