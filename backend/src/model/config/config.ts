import database, {PERSISTENCE_TYPES} from '../../config/database';

import ConfigModelMongoDB from './config-mongodb';

class ConfigModel {
    static get(type:any, caller:any = '') {
        console.log(`#### Config Model Persistence -> ${database.PERSISTENCE_TYPE || "by default"}${caller ?` Called from ${caller}` : ""} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ConfigModelMongoDB();
            default:
                return new ConfigModelMongoDB();
        }
    }
}

export default ConfigModel;
