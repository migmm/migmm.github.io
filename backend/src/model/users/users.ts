import database, { PERSISTENCE_TYPES } from '../../config/database';
import UserModelMongoDB from './users-mongodb';
import UserModelPostgres from './users-postgresql';


class UserModel {
    static get(type: any) {
        console.log(`#### Users Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'} ####`);        
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new UserModelMongoDB();
            case PERSISTENCE_TYPES.TYPE_POSTGRES:
                return new UserModelPostgres();
            default:
                return UserModelMongoDB;
        }
    }
}

export default UserModel;
