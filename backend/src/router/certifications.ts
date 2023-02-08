import express from 'express';
import certificationsController from '../controller/certifications';

const routerCertifications = express.Router();

routerCertifications.get('/', certificationsController.getCertifications);
routerCertifications.get('/:id', certificationsController.getCertification);
routerCertifications.post('/', certificationsController.postCertification);
routerCertifications.put('/:id', certificationsController.putCertification);
routerCertifications.delete('/:id', certificationsController.deleteCertification);

export default routerCertifications;
