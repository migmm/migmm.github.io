import express from 'express';
import usersController from '../controller/users';
import authRole from '../middlewares/authRole';

const routerUsers = express.Router();

routerUsers.get('/', usersController.getUsers);
//routerUsers.get('/', authRole(['admin']) as any, usersController.getUsers);
routerUsers.get('/:id', authRole(['admin']) as any,  usersController.getUser);
routerUsers.post('/',  usersController.postUser);
routerUsers.put('/:id',authRole(['admin', 'user']) as any,  usersController.putUser);
routerUsers.delete('/:id', authRole(['admin']) as any, usersController.deleteUser);

export default routerUsers;
