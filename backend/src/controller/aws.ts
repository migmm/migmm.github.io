import { v4 as uuidv4 } from 'uuid';
import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getPresignedUrl } from '@aws-sdk/s3-request-presigner';
import { Request, Response } from 'express';
import s3Client, { AWS_BUCKET_NAME }  from '../config/aws';


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

// Controller to get an image by ID
const getImage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const url = await getSignedUrl(id);
        console.log('URL:', url);
        res.status(200).json({ url });
    } catch (error) {
        console.error('Error retrieving the image:', error);
        res.status(500).json({ error: 'Error retrieving the image' });
    }
};

// Controller to get all images
const getImages = async (_req: Request, res: Response) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images = data.Contents?.map((obj) => obj.Key || '') || [];
        res.status(200).json(images);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to get all images with presigned URL
const getImagesPresignedURL = async (_req: Request, res: Response) => {
    const listParams = {
        Bucket: AWS_BUCKET_NAME,
    };

    try {
        const data = await s3Client.send(new ListObjectsCommand(listParams));
        const images =
            data.Contents?.map(async (obj) => {
                const signedUrl = await getSignedUrl(obj.Key || '');
                return { key: obj.Key, url: signedUrl };
            }) || [];

        const imagesWithUrls = await Promise.all(images);

        res.status(200).json(imagesWithUrls);
    } catch (err) {
        console.log('Error', err);
        res.status(500).json({ error: 'Error getting the images' });
    }
};

// Controller to upload images
const uploadImages = async (req: Request, res: Response) => {
    const uploadedImages = req.files as Express.Multer.File[];

    try {
        const uploadPromises = uploadedImages.map(async (image) => {
            const fileKey = `${uuidv4()}_${image.originalname}`;

            const uploadParams = {
                Bucket: AWS_BUCKET_NAME,
                Key: fileKey,
                Body: image.buffer,
            };

            await s3Client.send(new PutObjectCommand(uploadParams));

            const url = await getSignedUrl(fileKey);
            return url;
        });

        const urls = await Promise.all(uploadPromises);
        res.status(201).json({ urls });
    } catch (error) {
        console.error('Error uploading the images:', error);
        res.status(500).json({ error: 'Error uploading the images' });
    }
};

// Controller to delete an image
const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleteParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: id,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        res.status(204).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting the image:', error);
        res.status(500).json({ error: 'Error deleting the image' });
    }
};

export {
    getImage,
    getImages,
    getImagesPresignedURL,
    uploadImages,
    deleteImage,
}