import express from 'express';
import createRequestLimiter from '../middlewares/requestLimiter';
import authController from '../controller/auth';
import validationMiddleware from '../middlewares/validationMiddleware';
import { loginSchema } from '../model/validators/auth';
import authRole from '../middlewares/authRole';


const routerAuth = express.Router();
const requestLimiter = createRequestLimiter(3, 10, 'Too many login attemps, wait 10 min and tray again.');
const validateLogin = validationMiddleware(loginSchema);

routerAuth.get('/:user',  authRole(['admin']) as any, authController.getAuth);
routerAuth.post('/refresh', authRole(['admin']) as any, authController.refreshToken);
routerAuth.post('/', requestLimiter as any , validateLogin, authController.login);
routerAuth.post('/logout', authController.logout);


export default routerAuth;
