import database, {PERSISTENCE_TYPES} from '../../config/database';
import ProjectModelMongoDB from './projects-mongodb';
import ProjectModelPostgres from './projects-postgresql';

class ProjectModel {
    static get(type:any) {
        console.log(`#### Projects Model Persistence -> ${database.PERSISTENCE_TYPE || 'by default'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ProjectModelMongoDB();
            case PERSISTENCE_TYPES.TYPE_POSTGRES:
                return new ProjectModelPostgres();
            default:
                return new ProjectModelMongoDB();
        }
    }
}

export default ProjectModel;
