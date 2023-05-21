import database, { PERSISTENCE_TYPES } from '../../config/database';
import UserModelMongoDB from './users-mongodb';

class UserModel {
    static get(type: any, caller: any = '') {
        console.log(`#### Users Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'}${caller ?` called from ${caller}` : ''} ####`);        
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return UserModelMongoDB;
            default:
                return UserModelMongoDB;
        }
    }
}

export default UserModel;
