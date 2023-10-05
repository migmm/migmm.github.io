import express from 'express';
import authController from '../controller/auth';
import loginLimiter from '../middlewares/requestLimiter';

const routerAuth = express.Router();

routerAuth.get('/:user', authController.getAuth);
routerAuth.post('/', loginLimiter as any, authController.postAuth);
routerAuth.post('/logout', authController.logout);

export default routerAuth;
