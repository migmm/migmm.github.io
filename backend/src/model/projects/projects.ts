import database, {PERSISTENCE_TYPES} from '../../config/database';

import ProjectModelMongoDB from './projects-mongodb';

class ProjectModel {
    static get(type:any, caller:any = '') {
        console.log(`#### Projects Model Persistence -> ${database.PERSISTENCE_TYPE || "by default"}${caller ?` Called from ${caller}` : ""} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ProjectModelMongoDB();
            default:
                return new ProjectModelMongoDB();
        }
    }
}

export default ProjectModel;
