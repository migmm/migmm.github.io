import express from 'express';
import dotenv from 'dotenv';
import upload from '../middlewares/multer';
import { getImage, getImages, uploadImages, deleteImage, getImagesPresignedURL } from '../controller/aws';
import authRole from '../middlewares/authRole';


dotenv.config(); 

const STORAGE = process.env.STORAGE_LOCATION || '';
const router = express.Router();


router.get('/',  authRole(['admin']) as any, getImages);
router.get('/url', authRole(['admin']) as any, getImagesPresignedURL);
router.get('/url/:id',  authRole(['admin']) as any, getImage);
router.post('/',  authRole(['admin']) as any, upload(STORAGE).array('images', 10), uploadImages);
router.delete('/:id',  authRole(['admin']) as any, deleteImage);


export default router;
