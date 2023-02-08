import express from 'express';
import certificationsController from '../controller/certifications';
import multerFS from '../middlewares/multer';

const routerCertifications = express.Router();

routerCertifications.get('/', certificationsController.getCertifications);
routerCertifications.get('/:id', certificationsController.getCertification);
routerCertifications.post('/', multerFS.fieldConfig, certificationsController.postCertification);
routerCertifications.put('/:id', multerFS.fieldConfig, certificationsController.putCertification);
routerCertifications.delete('/:id', certificationsController.deleteCertification);

export default routerCertifications;
