import express from 'express';
import favouriteController from '../controller/favourite';


const routerFavourite = express.Router();

routerFavourite.post('/:id', favouriteController.addFavorite);

export default routerFavourite;
