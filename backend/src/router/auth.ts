import express from 'express';
import authController from '../controller/auth';

const routerAuth = express.Router();

routerAuth.get('/', authController.getAuth);
routerAuth.get('/:id', authController.getAuth);
routerAuth.post('/', authController.postAuth);
routerAuth.put('/:id', authController.putAuth);
routerAuth.delete('/:id', authController.deleteAuth);

export default routerAuth;
