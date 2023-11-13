import express from 'express';
import certificationsController from '../controller/certifications';
import validationMiddleware from '../middlewares/validationMiddleware';
import certificationSchema from '../model/validators/certification';

const routerCertifications = express.Router();

const validateCertification = validationMiddleware(certificationSchema);

routerCertifications.get('/', certificationsController.getCertifications);
routerCertifications.get('/:id', certificationsController.getCertification);
routerCertifications.post('/', validateCertification, certificationsController.postCertification);
routerCertifications.put('/:id', validateCertification, certificationsController.putCertification);
routerCertifications.delete('/:id', certificationsController.deleteCertification);

export default routerCertifications;
