import api from '../api/certifications';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
/* import { getSignedUrl as getPresignedUrl } from '@aws-sdk/s3-request-presigner'; */
import s3Client, { AWS_BUCKET_NAME } from '../config/aws';
import { handleFileUpload, convertFilesToBase64 } from '../utils/storage';
import dotenv from 'dotenv';

dotenv.config();

const STORAGE = process.env.STORAGE_LOCATION;

// Function to get the signed URL
/* const getSignedUrl = async (key: string): Promise<string> => {
    const bucketParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: key,
    };

    try {
        const url = await getPresignedUrl(s3Client, new GetObjectCommand(bucketParams), { expiresIn: 15 * 60 });
        return url;
    } catch (err) {
        console.log('Error', err);
        throw err;
    }
}; */

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: Response) => {
    const certifications = await api.getCertifications();

    try {
        res.status(200).json(certifications);
    } catch (error) {
        res.status(500).send('Error getting certifications');
    }
};

const getCertification = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const certification = await api.getCertification(id);

    try {
        res.status(200).json(certification);
    } catch (e) {
        res.status(500).send('Error getting certification');
    }
};

///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCertification = async (req: any, res: Response) => {
    const certification = req.body;

    console.log(req.files);
    try {
        if (!STORAGE) {
            console.error('Error: STORAGE_LOCATION no está configurado.');
            return res.status(500).send('Error interno del servidor');
        }

        if (STORAGE === 'local') {
            if (req.files && req.files.length > 0) {
                handleFileUpload(req.files as Express.Multer.File[], certification);
            }
        } else if (STORAGE === 's3') {
            if (req.files && req.files.length > 0) {
                const uploadedImages = req.files as Express.Multer.File[];

                const uploadPromises = uploadedImages.map(async (image) => {
                    const fileKey = `${uuidv4()}_${image.originalname}`;

                    const uploadParams = {
                        Bucket: AWS_BUCKET_NAME,
                        Key: fileKey,
                        Body: image.buffer,
                    };

                    await s3Client.send(new PutObjectCommand(uploadParams));

                    const url = fileKey;
                    return url;
                });

                const urls = await Promise.all(uploadPromises);
                certification.courseImage = urls;
            }
        } else if (STORAGE === 'db') {
            if (req.files && req.files.length > 0) {
                const base64Files = await convertFilesToBase64(req.files as Express.Multer.File[]);
                certification.courseImage = base64Files;
                console.log('Base64 representation:', base64Files);
            }
        }

        certification.storage = STORAGE;
        const newCertification = await api.createCertification(certification);
        res.status(201).json(newCertification);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error creating certification');
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
        res.status(500).send('Error modifying certification');
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
        res.status(500).send('Error deleting certification');
    }
};

export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
