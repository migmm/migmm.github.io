import express from 'express';
import favouriteController from '../controller/favourite';
import authRole from '../middlewares/authRole';


const routerFavourite = express.Router();


routerFavourite.post('/:id', authRole(['admin']) as any, favouriteController.addFavorite);
routerFavourite.delete('/:id', authRole(['admin']) as any, favouriteController.removeFavorite);


export default routerFavourite;
