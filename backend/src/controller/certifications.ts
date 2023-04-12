import api from "../api/certifications";


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: any) => {
    res.status(200).json(await api.getCertifications());
};

const getCertification = async (req: any, res: any) => {
    const id = req.params.id;
    res.status(200).json(await api.getCertification(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCertification = async (req: any, res: any) => {
    let certification = req.body;
    const newCertification = await api.createCertification(certification);
    res.status(201).json(newCertification);
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putCertification = async (req: any, res: any) => {
    const id = req.params.id;
    const certification = req.body;
    const updatedCertification = (await api.updateCertification(id, certification)) || {};
    res.status(200).json(updatedCertification);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (req: any, res: any) => {
    const id = req.params.id;
    const removedCertification = (await api.deleteCertification(id)) || {};
    res.status(200).json(removedCertification);
};


export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
