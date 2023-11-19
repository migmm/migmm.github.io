import database, { PERSISTENCE_TYPES } from '../../config/database';
import CertificationModelMongoDB from './certifications-mongodb';
import CertificationModelPostgres from './certifications-postgresql';


class CertificationModel {
    static get(type: any) {
        console.log(`#### Certifications Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'} ####`);
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
