import express from 'express';
import authController from '../controller/auth';

const routerAuth = express.Router();

routerAuth.get('/:user', authController.getAuth);
routerAuth.post('/', authController.postAuth);

export default routerAuth;
