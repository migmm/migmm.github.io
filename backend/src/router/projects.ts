import express from 'express';
import projectsController from '../controller/projects';
import validationMiddleware from '../middlewares/validationMiddleware';
import projectSchema from '../model/validators/project';
import authRole from '../middlewares/authRole';


const routerProjects = express.Router();
const validateProject = validationMiddleware(projectSchema);


routerProjects.get('/', projectsController.getProjects);
routerProjects.get('/search', projectsController.getProjectsByTag);
routerProjects.get('/:id', projectsController.getProject);
routerProjects.post('/', authRole(['admin']) as any, validateProject, projectsController.postProject);
routerProjects.put('/:id', authRole(['admin']) as any, validateProject, projectsController.putProject);
routerProjects.delete('/:id', authRole(['admin']) as any, projectsController.deleteProject);


export default routerProjects;
