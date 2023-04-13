import api from '../api/projects';


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getProjects = async (_req:any, res:any) => {
    const projects = await api.getProjects();

    try {
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).send('Error getting projects')
    }

};

const getProject = async (req:any, res:any) => {
    const id = req.params.id;
    const project = await api.getProject(id);

    try {
        res.status(200).json(project);
    } catch (error) {
        res.status(500).send('Error getting project')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postProject = async (req:any, res:any) => {
    let project = req.body;

    try {
        const newProject = await api.createProject(project);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).send('Error posting projects')
    }
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProject = async (req:any, res:any) => {
    const id = req.params.id;
    const project = req.body;

    try {
        const updatedProject = await api.updateProject(id, project) || {};
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).send('Error updating project')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteProject = async (req:any, res:any) => {
    const id = req.params.id;

    try {
        const removedProject = await api.deleteProject(id) || {};
        res.status(200).res.json(removedProject);
    } catch (error) {
        res.status(500).send('Error removing project')
    }

};


export default {
    getProjects,
    getProject,
    postProject,
    putProject,
    deleteProject,
};
