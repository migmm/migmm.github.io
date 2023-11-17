import express from 'express';
import dotenv from 'dotenv';
import certificationsController from '../controller/certifications';
import validationMiddleware from '../middlewares/validationMiddleware';
import certificationSchema from '../model/validators/certification';
import upload from '../middlewares/multer';


dotenv.config(); 

const STORAGE = process.env.STORAGE_LOCATION || '';

const routerCertifications = express.Router();

const validateCertification = validationMiddleware(certificationSchema);

routerCertifications.get('/', certificationsController.getCertifications);
routerCertifications.get('/:id', certificationsController.getCertification);
routerCertifications.post('/',  upload(STORAGE).array('images', 10), certificationsController.postCertification);
routerCertifications.put('/:id', validateCertification,  upload(STORAGE).array('images', 10), certificationsController.putCertification);
routerCertifications.delete('/:id', certificationsController.deleteCertification);


export default routerCertifications;
