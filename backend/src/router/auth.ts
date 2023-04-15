import express from 'express';
import usersController from '../controller/users';
import multerFS from '../middlewares/multer';

const routerAuth = express.Router();

routerAuth.get('/', usersController.getUsers);
routerAuth.get('/:id', usersController.getUser);
routerAuth.post('/', multerFS.fieldConfig, usersController.postUser);
routerAuth.put('/:id', multerFS.fieldConfig, usersController.putUser);
routerAuth.delete('/:id', usersController.deleteUser);

export default routerAuth;
