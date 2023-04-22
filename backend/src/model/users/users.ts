import config, {PERSISTENCE_TYPES} from '../../config/config';

import UserModelMongoDB from './users-mongodb';

class UserModel {
    static get(type:any) {
        console.log(`#### Persistence -> ${config.PERSISTENCE_TYPE || 'by default'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new UserModelMongoDB();
            default:
                return new UserModelMongoDB();
        }
    }
}

export default UserModel;
