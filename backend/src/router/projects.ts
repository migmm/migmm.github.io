import express from 'express';
import projectsController from '../controller/projects';
import multerFS from '../middlewares/multer';
import authRole from '../middlewares/authRole';

const routerProjects = express.Router();

routerProjects.get('/', authRole(['admin', 'user']) as any,projectsController.getProjects);
routerProjects.get('/:id', projectsController.getProject);
routerProjects.post('/', multerFS.fieldConfig, projectsController.postProject);
routerProjects.put('/:id', multerFS.fieldConfig, projectsController.putProject);
routerProjects.delete('/:id', projectsController.deleteProject);

export default routerProjects;
