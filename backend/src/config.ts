import * as dotenv from 'dotenv'
dotenv.config()

const PERSISTENCE_TYPES = {
    TYPE_MONGODB: 'MONGODB',
};

const PRODUCT_IMG_UPLOAD_LOCATION = {
    STORAGE_LOCATION: './tmp/uploads',
}

const config = {
    PORT: process.env.SERVER_PORT,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,
    MONGODB_CONNECTION_STR: process.env.MONGODB_STRING,
    MONGODB_TIMEOUT: 30000
};

export {
    PERSISTENCE_TYPES,
    PRODUCT_IMG_UPLOAD_LOCATION, 
    config as default
};
