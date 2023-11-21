import express from 'express';
import resetPassword from '../controller/resetPassword';
import authRole from '../middlewares/authRole';


const routerResetPassword = express.Router();


routerResetPassword.post('/:resetToken', authRole(['admin']) as any, resetPassword as any);


export default routerResetPassword;
