import config from '../config/config';
import ProjectModel from "../model/projects/projects";
import ProjectValidator from '../model/validators/project';

const modelProjects = ProjectModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getProjects = async () => {
    const projects = await modelProjects.readProjects();
    return projects;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getProject = async (id:number) => {
    const project = await modelProjects.readProject(id);
    return project;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProject = async (project:any) => {

        const validationError = ProjectValidator.validate(project);
    
        if(!validationError) {
            const createdProject = await modelProjects.createProject(project);
            return createdProject;  
        } else {
            console.log(validationError);
            console.error(`Error validating createProject: ${validationError.details[0].message}`);
            return {};
        }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProject = async (id:number, project:any) => {

    const validationError = ProjectValidator.validate(project);

    if(!validationError) {
        const updatedProject = await modelProjects.updateProject(id, project);
        return updatedProject;    
    } else {
        console.log(validationError);
        console.error(`Error validating updateProject: ${validationError.details[0].message}`);
        return {};
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteProject = async (id:number) => {
    const removedProject = await modelProjects.deleteProject(id);
    return removedProject;
};


export default {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
