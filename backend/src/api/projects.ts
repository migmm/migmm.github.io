import database from '../config/database';
import ProjectModel from '../model/projects/projects';

const modelProjects = ProjectModel.get(database.PERSISTENCE_TYPE, 'projects');


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

const getProject = async (id: number) => {
    const project = await modelProjects.readProject(id);
    return project;
};


///////////////////////////////////////////////////////////////////////////////
//                               API Get by TAG                              //
///////////////////////////////////////////////////////////////////////////////

const getProjectsByTags = async (tags : any) => {
    const projects = await modelProjects.getProjectsByTags(tags);
    return projects;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProject = async (project:any) => {
    const createdProject = await modelProjects.createProject(project);
    return createdProject;  
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProject = async (id: number, project:any) => {
    const updatedProject = await modelProjects.updateProject(id, project);
    return updatedProject;    
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteProject = async (id: number) => {
    const removedProject = await modelProjects.deleteProject(id);
    return removedProject;
};


export default {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByTags
};
