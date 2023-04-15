import express from 'express';
import usersController from '../controller/users';
import multerFS from '../middlewares/multer';

const routerUsers = express.Router();

routerUsers.get('/', usersController.getUsers);
routerUsers.get('/:id', usersController.getUser);
routerUsers.post('/', multerFS.fieldConfig, usersController.postUser);
routerUsers.put('/:id', multerFS.fieldConfig, usersController.putUser);
routerUsers.delete('/:id', usersController.deleteUser);

export default routerUsers;
