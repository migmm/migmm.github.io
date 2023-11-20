import database, { PERSISTENCE_TYPES } from '../../config/database';
import CertificationModelMongoDB from './certifications-mongodb';
import CertificationModelPostgres from './certifications-postgresql';


class CertificationModel {
    static get(type: any, caller: any) {
        console.log(`#### Certification Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'}${caller ?` called from ${caller}` : ''} ####`);   
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new CertificationModelMongoDB();
            case PERSISTENCE_TYPES.TYPE_POSTGRES:
                return new CertificationModelPostgres();
            default:
                return new CertificationModelMongoDB();
        }
    }
}

export default CertificationModel;
