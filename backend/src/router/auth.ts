import express from 'express';
import authController from '../controller/auth';
import createRequestLimiter from '../middlewares/requestLimiter';

const routerAuth = express.Router();
const requestLimiter = createRequestLimiter(3, 10, 'Too many login attemps, wait 10 min and tray again.');

routerAuth.get('/:user', authController.getAuth);
routerAuth.post('/', requestLimiter as any, authController.postAuth);
routerAuth.post('/logout', authController.logout);

export default routerAuth;
