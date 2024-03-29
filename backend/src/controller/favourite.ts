import { Request, Response } from 'express';
import api from '../api/favorites';
import { UserPayload }  from '../interface/favourite';
import jwt from 'jsonwebtoken';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const cookieName: string = process.env.COOKIE_NAME || 'jwt';


const addFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const token = req.cookies?.[cookieName];

        // Decode token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as UserPayload;

        // Check if user exists
        const userID = await api.getUser(decodedToken.id) as UserPayload;

        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // TO DO
        // Check if user exists
        // Check if fav (product or article or whatever) exists
        // Assemble object with the modified Favourites items

        const newFavourite = {
            favourites : userID.favourites,
        };

        const newElement = id;
        newFavourite.favourites.push(newElement);

        const favorite = await api.updateUser(decodedToken.id, newFavourite);

        res.json(favorite);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the favorite.' });
    }
};


const removeFavorite = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const token = req.cookies.cookieName;

        // Decode token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as UserPayload;

        // Check if user exists
        const userID = await api.getUser(decodedToken.id) as UserPayload;

        if (!userID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // TO DO
        // Check if user exists
        // Check if fav (product or article or whatever) exists
        // Assemble object with the modified Favourites items

        const newFavourite = {
            favourites : userID.favourites,
        };

        const newElement = id;
        newFavourite.favourites = newFavourite.favourites.filter((element) => element !== newElement);

        const favorite = await api.updateUser(decodedToken.id, newFavourite);

        res.json(favorite);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the favorite.' });
    }
};
export default { 
    addFavorite,
    removeFavorite
};
