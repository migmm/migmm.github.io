import mongoose from 'mongoose';
import DBMongoDB from '../../dbs/DBMongoDB';


const projectSchema = new mongoose.Schema(
    {
        projecName: String,
        projectStatus: String,
        showInLandPage: Boolean,
        gitURL: String,
        urlGithubRepo: String,
        deployURL: String,
        tags: String,
        coverImage: String,
        editorHtml: String,
        useFromGit: Boolean,
        headerLine: String,
        category: String,
        lastUpdate: Date,
        titleCheck: String,
        created_at: { 
            type: Date, 
            default: Date.now 
        },
        modified_at: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        versionKey: false,
    }
);

mongoose.set('strictQuery', false);

const ProjectsModel = mongoose.model('projects', projectSchema);

class ProjectModelMongoDB {
    // CRUD - C: CREATE
    async createProject(project: any) {
        await DBMongoDB.getInstance();
        try {
            const newProject = new ProjectsModel(project);
            await newProject.save();
            return DBMongoDB.getObjectWithId(newProject.toObject());
        } catch (error: any) {
            console.error(`Error adding project: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readProjects() {
        await DBMongoDB.getInstance();
        try {
            const projects = await ProjectsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(projects);
        } catch (error: any) {
            console.error(`Error getting projects: ${error.message}`);
            return [];
        }
    }

    async readProject(id: any) {
        await DBMongoDB.getInstance();
        try {
            const product = (await ProjectsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting project: ${error.message}`);
            return {};
        }
    }

    // Route to find by any value in database
    async getProjectsByTags (tags: string[]) {
        try {
            await DBMongoDB.getInstance();
    
            const projects = await ProjectsModel.find({ tags: { $in: tags } }).lean();
    
            return DBMongoDB.getObjectWithId(projects);
        } catch (error: any) {
            console.error(`Error getting projects by tag: ${error.message}`);
            return [];
        }
    };
    

    // CRUD - U: UPDATE
    async updateProject(id: number, project: any) {
        await DBMongoDB.getInstance();
        try {
            const updatedProject = await ProjectsModel.findByIdAndUpdate(
                id,
                { $set: project },
                {
                    returnDocument: 'after',
                }
            ).lean();
            return DBMongoDB.getObjectWithId(updatedProject);
        } catch (error: any) {
            console.error(`Error updating project: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteProject(id: number) {
        await DBMongoDB.getInstance();
        try {
            const deletedProject = await ProjectsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedProject);
        } catch (error: any) {
            console.error(`Error deleting projecto: ${error.message}`);
            return {};
        }
    }
}

export default ProjectModelMongoDB;
