import express from 'express';
import forgotPassword from '../controller/forgotPassword';
import authRole from '../middlewares/authRole';


const routerforgotPassword = express.Router();


routerforgotPassword.post('/', authRole(['admin']) as any, forgotPassword as any);


export default routerforgotPassword;
