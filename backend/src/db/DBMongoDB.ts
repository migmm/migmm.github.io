import database from '../config/database';
import mongoose from 'mongoose';


// Using Singleton pattern to you ensure that only one instance 
// of the DBMongoDB class is created, which represents a single database connection
class DBMongoDB {
    private static instance: DBMongoDB;
    private static connectionPromise: Promise<typeof mongoose> | null = null;

    static READY_STATE_DISCONNECTED = 0;
    static READY_STATE_CONNECTED = 1;
    static READY_STATE_CONNECTING = 2;
    static READY_STATE_DISCONNECTING = 3;

    static primaryKey = '_id';

    static getObjectWithId(obj: any) {
        if (Array.isArray(obj)) {
            obj.forEach(el => {
                el.id = el[DBMongoDB.primaryKey];
                delete el[DBMongoDB.primaryKey];
            });
        } else {
            obj.id = obj[DBMongoDB.primaryKey];
            delete obj[DBMongoDB.primaryKey];
        }
        console.log('dfddffd', obj)
        return obj;
    }

    private constructor() {
        mongoose.connect(database.MONGODB_CONNECTION_STR as string);
        console.log('Connected to MongoDB database.');
    }

    static async getInstance() {
        if (!DBMongoDB.instance) {
            DBMongoDB.connectionPromise = mongoose.connect(database.MONGODB_CONNECTION_STR as string);
            DBMongoDB.instance = new DBMongoDB();
        } else if (DBMongoDB.connectionPromise) {
            // If a connection is in progress, await it before returning the instance
            await DBMongoDB.connectionPromise;
        }

        return DBMongoDB.instance;
    }
}

export default DBMongoDB;
