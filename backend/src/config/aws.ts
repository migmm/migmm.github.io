import { S3 } from '@aws-sdk/client-s3';
import dotEnvExtended from 'dotenv-extended';
dotEnvExtended.load();


// S3 configuration
const s3Client = new S3({
    endpoint: process.env.AWS_ENDPOINT as string,
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET as string,
    },
});

// S3 Bucket name
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export { 
    s3Client as default, 
    AWS_BUCKET_NAME 
};
