import database, {PERSISTENCE_TYPES} from '../../config/database';
import ConfigModelMongoDB from './config-mongodb';
import ConfigModelPostgres from './config-postgresql';

class ConfigModel {
    static get(type: any, caller: any) {
        console.log(`#### Config Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'}${caller ?` called from ${caller}` : ''} ####`);  
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ConfigModelMongoDB();
            case PERSISTENCE_TYPES.TYPE_POSTGRES:
                return new ConfigModelPostgres();
            default:
                return new ConfigModelMongoDB();
        }
    }
}

export default ConfigModel;
