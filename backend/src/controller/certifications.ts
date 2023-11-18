import api from '../api/certifications';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getPresignedUrl } from '@aws-sdk/s3-request-presigner';
import * as fs from 'fs';
import s3Client, { AWS_BUCKET_NAME } from '../config/aws';
import { handleFileUpload, convertFilesToBase64 } from '../utils/storage';
import dotenv from 'dotenv';

dotenv.config();

const STORAGE = process.env.STORAGE_LOCATION;


// Function to get the signed URL
const getSignedUrl = async (key: string): Promise<string> => {
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
};


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCertifications = async (_req: any, res: Response) => {
    
    try {
        const certifications = await api.getCertifications();
        console.log('Certifications length:', certifications.length);
        console.log(certifications)
        const certificationsWithSignedUrls = await Promise.all(certifications.map(async (certification: any) => {
            if (certification.storage === 's3') {
                const signedUrls = await Promise.all(certification.courseImage.map(getSignedUrl));
                certification.courseImage = signedUrls;
            }

            return certification;
        }));

        res.status(200).json(certificationsWithSignedUrls);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error getting certifications');
    }
};

const getCertification = async (req: Request, res: Response) => {
    const id: any = req.params.id;

    try {
        const certification = await api.getCertification(id);

        const signedUrls = await Promise.all(certification.courseImage.map(async (image: string) => {
            return await getSignedUrl(image);
        }));

        certification.courseImage = signedUrls;

        res.status(200).json(certification);
    } catch (e) {
        console.error('Error getting certification:', e);
        res.status(500).send('Error getting certification');
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCertification = async (req: any, res: Response) => {
    const certification = req.body;

    if (!STORAGE) {
        console.error('Error: STORAGE_LOCATION not defined.');
        return res.status(500).send('Internal server error.');
    }

    try {
        if (req.files && req.files.length > 0) {

            if (STORAGE === 'local') {
                handleFileUpload(req.files as Express.Multer.File[], certification);
            } else if (STORAGE === 's3') {
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

            } else if (STORAGE === 'db') {
                const base64Files = await convertFilesToBase64(req.files as Express.Multer.File[]);
                certification.courseImage = base64Files;
            }
        }

        certification.storage = STORAGE;
        const newCertification = await api.createCertification(certification);
        res.status(201).json(newCertification);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error creating certification.');
    }
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putCertification = async (req: any, res: Response) => {
    const id = req.params.id;
    const certification = req.body;

    if (certification.storage) {
        console.error('Error: STORAGE_LOCATION not defined.');
        return res.status(500).send('Internal server error.');
    }

    try {
        if (req.files && req.files.length > 0) {

            if (certification.storage === 'local') {
                handleFileUpload(req.files as Express.Multer.File[], certification);
            } else if (certification.storage === 's3') {
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

            } else if (certification.storage === 'db') {
                const base64Files = await convertFilesToBase64(req.files as Express.Multer.File[]);
                certification.courseImage = base64Files;
            }
        }

        const updatedCertification = (await api.updateCertification(id, certification)) || {};
        res.status(201).json(updatedCertification);
    } catch (e) {
        console.log(e);
        res.status(500).send('Error updating certification.');
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteCertification = async (req: any, res: Response) => {
    const id = req.params.id;

    try {
        if (STORAGE === 'local') {
            await deleteLocalFiles(id);
        } else if (STORAGE === 's3') {
            await deleteS3Files(id);
        } else if (STORAGE === 'db') {
            // No se requiere acción específica para eliminar archivos en la base de datos
        }

        const removedCertification = await api.deleteCertification(id);
        res.status(200).json(removedCertification);
    } catch (e) {
        console.error('Error deleting certification:', e);
        res.status(500).send('Error deleting certification.');
    }
};

const deleteLocalFiles = async (certificationId: string) => {
    const certification = await api.getCertification(certificationId);
    const fileNames = certification.courseImage;

    // Eliminar archivos locales asociados al certificado
    await Promise.all(fileNames.map(async (fileName: string) => {
        const filePath = `uploads/${fileName}`;
        try {
            await fs.promises.unlink(filePath);
            console.log('File deleted successfully');
        } catch (err) {
            console.error('Error deleting file:', err);
        }
    }));
};

const deleteS3Files = async (certificationId: string) => {
    const certification = await api.getCertification(certificationId);
    const fileNames = certification.courseImage;

    await Promise.all(fileNames.map(async (fileName: string) => {
        const deleteParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
        };

        try {
            await s3Client.send(new DeleteObjectCommand(deleteParams));
            console.log(`File '${fileName}' deleted successfully from S3`);
        } catch (err) {
            console.error(`Error deleting file '${fileName}' from S3:`, err);
        }
    }));
};


export default {
    getCertifications,
    getCertification,
    postCertification,
    putCertification,
    deleteCertification,
};
