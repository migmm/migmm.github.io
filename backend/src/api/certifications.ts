import database from '../config/database';
import CertificationModel from '../model/certifications/certifications';

const modelCertifications = CertificationModel.get(database.PERSISTENCE_TYPE);


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

const getCertification = async (id: number) => {
        const certification = await modelCertifications.readCertification(id);
        return certification;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createCertification = async (certification: any) => {
    const createdCertification = await modelCertifications.createCertification(certification);
    return createdCertification;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateCertification = async (id: number, certification: any) => {
    const updatedCertification = await modelCertifications.updateCertification(id, certification);
    return updatedCertification;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (id: number) => {
        const removedCertification = await modelCertifications.deleteCertification(id);
        return removedCertification;
};


export default {
    getCertifications,
    getCertification,
    createCertification,
    updateCertification,
    deleteCertification,
};
