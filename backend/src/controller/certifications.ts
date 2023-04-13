import api from "../api/certifications";
import { Request, Response } from "express";

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: Response) => {
    const certifications = await api.getCertifications();

    try {
        res.status(200).json(certifications);
    } catch (error) {
        res.status(500).send('Error getting certifications')
    }
};

const getCertification = async (req: Request, res: Response) => {
    const id:any = req.params.id;
    const certification = await api.getCertification(id)

    try {
        res.status(200).json(certification);
    } catch (e) {
        res.status(500).send('Error getting certification')
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCertification = async (req: any, res: Response) => {
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

const putCertification = async (req: any, res: Response) => {
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

const deleteCertification = async (req: any, res: Response) => {
    const id = req.params.id;

    try {
    const removedCertification = (await api.deleteCertification(id)) || {};
    res.status(200).json(removedCertification);
    } catch (e) {
        res.status(500).send('Error deleting certification')
    }
};

export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
