import api from "../api/certifications";


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: any) => {
    const certifications = await api.getCertifications();

    try {
        if(!certifications.length){
            throw new Error ();
        } 
        res.status(200).json(certifications);

    } catch (error) {
        res.status(500).send('Error getting certifications')
    }
};

const getCertification = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        if(!id){
            throw new Error ();
        } 
        res.status(200).json(await api.getCertification(id));
    } catch (e) {
        res.status(500).send('Error getting certification')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCertification = async (req: any, res: any) => {
    let certification = req.body;

    try {
        const newCertification = await api.createCertification(certification);
        res.status(201).json(newCertification);
    } catch (e) {
        res.status(500).send('Error creating certification')
    }
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putCertification = async (req: any, res: any) => {
    const id = req.params.id;
    const certification = req.body;
    
    try {
        const updatedCertification = (await api.updateCertification(id, certification)) || {};
        res.status(200).json(updatedCertification);
    } catch (e) {
        res.status(500).send('Error modifying certification')
    }
    
    
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (req: any, res: any) => {
    const id = req.params.id;

    try {
    const removedCertification = (await api.deleteCertification(id)) || {};
    res.status(200).json(removedCertification);
    } catch (e) {
        res.status(500).send('Error modifying certification')
    }
};

export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
