import express from 'express';
import usersController from '../controller/auth';

const routerAuth = express.Router();

routerAuth.get('/', usersController.getAuth);
routerAuth.get('/:id', usersController.getAuth);
routerAuth.post('/', usersController.postAuth);
routerAuth.put('/:id', usersController.putAuth);
routerAuth.delete('/:id', usersController.deleteAuth);

export default routerAuth;
