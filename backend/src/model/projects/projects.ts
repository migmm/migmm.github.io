import config, {PERSISTENCE_TYPES} from '../../config';

import ProjectModelMongoDB from './projects-mongodb';

class ProjectModel {
    static get(type:any) {
        console.log(`#### Persistence -> ${config.PERSISTENCE_TYPE || 'by default'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ProjectModelMongoDB();
            default:
                return new ProjectModelMongoDB();
        }
    }
}

export default ProjectModel;
