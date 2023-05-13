import express from 'express';
import resetPassword from '../controller/resetPassword';

const routerResetPassword = express.Router();

routerResetPassword.post('/:resetToken', resetPassword as any);

export default routerResetPassword;
