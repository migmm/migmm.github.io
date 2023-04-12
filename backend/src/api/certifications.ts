import config from "../config";
import CertificationModel from "../model/certifications/certifications";
import CertificationValidator from "../model/validators/certifications";

const modelCertifications = CertificationModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getCertifications = async () => {
    try {
        const certifications = await modelCertifications.readCertifications();
        return certifications;
    } catch (error) {
        throw error;
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getCertification = async (id: number) => {
    try {
        const certification = await modelCertifications.readCertification(id);
        return certification;
    } catch (error) {
        throw error;
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createCertification = async (certification: any) => {
    
        const validationError = CertificationValidator.validate(certification);

        if (!validationError) {
            const createdCertification = await modelCertifications.createCertification(certification);
            return createdCertification;
        } else {
            throw new Error("Error creating certificate.");
        }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateCertification = async (id: number, certification: any) => {
    
        const validationError = CertificationValidator.validate(certification);
        if (!validationError) {
            const updatedCertification = await modelCertifications.updateCertification(id, certification);
            return updatedCertification;
        } else {
            throw new Error("Error updating certificate.");
        }

};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (id: number) => {
    try {
        const removedCertification = await modelCertifications.deleteCertification(id);
        return removedCertification;
    } catch (error) {
        throw error;
    }
};

export default {
    getCertifications,
    getCertification,
    createCertification,
    updateCertification,
    deleteCertification,
};
