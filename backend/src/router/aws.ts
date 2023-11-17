import express from 'express';
import dotenv from 'dotenv';
import upload from '../middlewares/multer';
import { getImage, getImages, uploadImages, deleteImage, getImagesPresignedURL } from '../controller/aws';

dotenv.config(); 

const STORAGE = process.env.STORAGE_LOCATION || '';

const router = express.Router();

router.get('/', getImages);
router.get('/url',getImagesPresignedURL);
router.get('/url/:id', getImage);
router.post('/', upload(STORAGE).array('images', 10), uploadImages);
router.delete('/:id', deleteImage);

export default router;
