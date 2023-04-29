import express from 'express';
import usersController from '../controller/users';
import authRole from '../middlewares/authRole';

const routerUsers = express.Router();

routerUsers.get('/', usersController.getUsers);
routerUsers.get('/:id', usersController.getUser);
routerUsers.post('/',  usersController.postUser);
routerUsers.put('/:id',authRole(['admin', 'user']) as any,  usersController.putUser);
routerUsers.delete('/:id', usersController.deleteUser);

export default routerUsers;
