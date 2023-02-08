// const {getProduct, getProducts} = require('../api/products');
import api from '../api/projects';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getProjects = async (_req:any, res:any) => {
    res.json(await api.getProjects());
};

const getProject = async (req:any, res:any) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    res.json(await api.getProject(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postProject = async (req:any, res:any) => {
    let project = req.body;
    const newProject = await api.createProject(project);
    res.json(newProject);
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProject = async (req:any, res:any) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const project = req.body;

    const updatedProject = await api.updateProject(id, project) || {};
    res.json(updatedProject);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteProject = async (req:any, res:any) => {
    // const id = Number(req.params.id);
    const id = req.params.id;

    const removedProject = await api.deleteProject(id) || {};
    res.json(removedProject);
};


export default {
    getProjects,    // getProjects: getProjects
    getProject,
    postProject,
    putProject,
    deleteProject,
};
