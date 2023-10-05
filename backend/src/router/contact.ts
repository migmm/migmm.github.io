import express from 'express';
import contactController from '../controller/contact';
import createRequestLimiter from '../middlewares/requestLimiter';

const routerContact = express.Router();
const requestLimiter = createRequestLimiter(2, 60, 'Youve already sent the message, please wait an hour.');


routerContact.post('/', requestLimiter as any, contactController.postMessage);


export default routerContact;
