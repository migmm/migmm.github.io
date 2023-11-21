import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load(); 


const PERSISTENCE_TYPES = {
    TYPE_MONGODB: 'MONGODB',
    TYPE_POSTGRES: 'POSTGRES',
};

const database = {
    PERSISTENCE_TYPE: process.env.PERSISTENCE_TYPE || PERSISTENCE_TYPES.TYPE_MONGODB,
    MONGODB_CONNECTION_STR: process.env.MONGODB_STRING,
    POSTGRES_CONNECTION_STR: process.env.POSTGRES_STRING,
};

export {
    PERSISTENCE_TYPES,
    database as default
};
