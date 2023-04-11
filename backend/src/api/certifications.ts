import config from '../config';
import CertificationModel from "../model/certifications/certifications";
import CertificationValidator from '../model/validators/certifications';

const modelCertifications = CertificationModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getCertifications = async () => {
    const certifications = await modelCertifications.readCertifications();
    return certifications;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getCertification = async (id:number, res:any) => {
    const certification = await modelCertifications.readCertification(id);
    if (!certification) {
        return res.status(400).json({ "message": `Certification ID ${id} not found` });
    }
    return certification;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createCertification = async (certification:any, res:any) => {

        const validationError = CertificationValidator.validate(certification);
    
        if(!validationError) {
            const createdCertification = await modelCertifications.createCertification(certification);
            return createdCertification;  
        } else {
            console.log(validationError);
            console.error(`Error validating createCertification: ${validationError.details[0].message}`);
            return res.status(400).json({ 'message': 'Error creating certificate.' });
        }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateCertification = async (id:number, certification:any, res: any) => {

    const validationError = CertificationValidator.validate(certification);

    if(!validationError) {
        const updatedCertification = await modelCertifications.updateCertification(id, certification);
        return updatedCertification;    
    } else {
        console.log(validationError);
        console.error(`Error validating updateCertification: ${validationError.details[0].message}`);
        return res.status(400).json({ 'message': 'Error updating certificate.' });
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (id:number, res:any) => {
    const certification = await modelCertifications.readCertification(id);
    if (!certification) {
        return res.status(400).json({ "message": `Certification ID ${id} not found` });
    }
    const removedCertification = await modelCertifications.deleteCertification(id);
    return removedCertification;
};


export default {
    getCertifications,
    getCertification,
    createCertification,
    updateCertification,
    deleteCertification
};
