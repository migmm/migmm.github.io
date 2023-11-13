import express from 'express';
import projectsController from '../controller/projects';
import validationMiddleware from '../middlewares/validationMiddleware';
import projectSchema from '../model/validators/project';

/* import authRole from '../middlewares/authRole'; */

const routerProjects = express.Router();

const validateProject = validationMiddleware(projectSchema);

routerProjects.get('/',/*  authRole(['admin', 'user']) as any, */projectsController.getProjects);
routerProjects.get('/search', projectsController.getProjectsByTag);
routerProjects.get('/:id', projectsController.getProject);
routerProjects.post('/', validateProject, projectsController.postProject);
routerProjects.put('/:id', validateProject, projectsController.putProject);
routerProjects.delete('/:id', projectsController.deleteProject);


export default routerProjects;
