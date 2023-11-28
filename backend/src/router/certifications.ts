import express from 'express';
import certificationsController from '../controller/certifications';
import validationMiddleware from '../middlewares/validationMiddleware';
import certificationSchema from '../model/validators/certification';
import upload from '../middlewares/multer';
import authRole from '../middlewares/authRole';
import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();


const STORAGE = process.env.STORAGE_LOCATION || '';
const routerCertifications = express.Router();
const validateCertification = validationMiddleware(certificationSchema);


routerCertifications.get('/', certificationsController.getCertifications);
routerCertifications.get('/:id', certificationsController.getCertification);
routerCertifications.post('/', authRole(['admin']) as any, upload(STORAGE).array('images', 10), certificationsController.postCertification);
routerCertifications.put('/:id', authRole(['admin']) as any, validateCertification,  upload(STORAGE).array('images', 10), certificationsController.putCertification);
routerCertifications.delete('/:id', authRole(['admin']) as any, certificationsController.deleteCertification);


export default routerCertifications;
