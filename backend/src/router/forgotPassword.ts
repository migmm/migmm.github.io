import express from 'express';
import forgotPassword from '../controller/forgotPassword';

const routerforgotPassword = express.Router();

routerforgotPassword.post('/', forgotPassword as any);

export default routerforgotPassword;
