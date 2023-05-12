import express from 'express';
import forgotPassword from '../controller/forgotPassword';

const routerPasswordReset = express.Router();

routerPasswordReset.post('/', forgotPassword as any);

export default routerPasswordReset;
