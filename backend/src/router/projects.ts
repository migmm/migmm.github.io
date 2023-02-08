import express from 'express';
import projectsController from '../controller/projects';

const routerProjects = express.Router();

routerProjects.get('/', projectsController.getProjects);
routerProjects.get('/:id', projectsController.getProject);
routerProjects.post('/', projectsController.postProject);
routerProjects.put('/:id', projectsController.putProject);
routerProjects.delete('/:id', projectsController.deleteProject);

export default routerProjects;
