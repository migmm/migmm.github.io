import express from 'express';
import forgotPassword from '../controller/passwordReset';

const routerPasswordReset = express.Router();

routerPasswordReset.post('/', forgotPassword as any);

export default routerPasswordReset;
