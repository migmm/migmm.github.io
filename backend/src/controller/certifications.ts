import api from "../api/certifications";


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: any) => {
    try {
        res.status(200).json(await api.getCertifications());
    } catch (error) {
        res.status(500).json({ message: `Certifications not found` });
    }
};

const getCertification = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        res.status(200).json(await api.getCertification(id));
    } catch (error) {
        res.status(500).json({ message: `Certification ID ${id} not found` });
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
    } catch (error) {
        return res.status(500).json({ message: "Error creating certification." });
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
        res.status(201).json(updatedCertification);
    } catch (error) {
        return res.status(500).json({ message: "Error updating certification." });
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const removedCertification = (await api.deleteCertification(id)) || {};
        res.status(204).json(removedCertification);
    } catch (error) {
        res.status(500).json({ message: `Error deleting Certification ID ${id}` });
    }
};

export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
