import express from 'express';
import projectsController from '../controller/projects';

import authRole from '../middlewares/authRole';

const routerProjects = express.Router();

routerProjects.get('/', authRole(['admin', 'user']) as any,projectsController.getProjects);
routerProjects.get('/:id', projectsController.getProject);
routerProjects.post('/',  projectsController.postProject);
routerProjects.put('/:id',  projectsController.putProject);
routerProjects.delete('/:id', projectsController.deleteProject);

export default routerProjects;
