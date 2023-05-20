import * as dotenv from 'dotenv'
dotenv.config()


const PRODUCT_IMG_UPLOAD_LOCATION = {
    STORAGE_LOCATION: './tmp/uploads',
}

const config = {
    PORT: process.env.SERVER_PORT,
};

export {
    PRODUCT_IMG_UPLOAD_LOCATION,
    config as default
};
