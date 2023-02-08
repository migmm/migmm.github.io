import config from '../config';
import mongoose from "mongoose";
//import { any, string } from 'joi';

class DBMongoDB {

    static READY_STATE_DISCONNECTED = 0;
    static READY_STATE_CONNECTED = 1;
    static READY_STATE_CONNECTING = 2;
    static READY_STATE_DISCONNECTING = 3;

    static primaryKey = '_id';

    static getObjectWithId(obj:any) {
        if (Array.isArray(obj)) {
            obj.forEach(el => {
                el.id = el[DBMongoDB.primaryKey];
                delete el[DBMongoDB.primaryKey];
            });
        } else {
            obj.id = obj[DBMongoDB.primaryKey];
            delete obj[DBMongoDB.primaryKey];
        }
        return obj;
    }

    static async connectDB() {
        try {
            if (mongoose.connection.readyState === DBMongoDB.READY_STATE_CONNECTED) {
                return true;
            }

            mongoose.connect(config.MONGODB_CONNECTION_STR as any);

            console.log('Conexión con MongoDB exitosa.');
            return true;

        } catch (error:any) {
            console.error(`Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`);
            return false;
        }
    }

}

export default DBMongoDB;
