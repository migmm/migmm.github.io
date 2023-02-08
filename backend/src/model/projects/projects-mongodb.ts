import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB";

const projectSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        languajes: Array,
        urlDeploy: String,
        urlGithubRepo: String,
        photos: Array,
    },
    {
        versionKey: false,
    }
);

mongoose.set("strictQuery", false);

const ProjectsModel = mongoose.model("projects", projectSchema);

class ProjectModelMongoDB {
    // CRUD - C: CREATE
    async createProject(project: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
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
        if (!(await DBMongoDB.connectDB())) {
            return [];
        }
        try {
            const projects = await ProjectsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(projects);
        } catch (error: any) {
            console.error(`Error getting projects: ${error.message}`);
            return [];
        }
    }

    async readProject(id: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const product = (await ProjectsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting prject: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateProject(id: number, project: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const updatedProject = await ProjectsModel.findByIdAndUpdate(
                id,
                { $set: project },
                {
                    returnDocument: "after",
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
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
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
