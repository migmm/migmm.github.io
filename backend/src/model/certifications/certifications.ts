import config, {PERSISTENCE_TYPES} from '../../config/config';

import CertificationModelMongoDB from './certifications-mongodb';

class CertificationModel {
    static get(type:any) {
        console.log(`#### Persistence -> ${config.PERSISTENCE_TYPE || 'by default'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new CertificationModelMongoDB();
            default:
                return new CertificationModelMongoDB();
        }
    }
}

export default CertificationModel;
