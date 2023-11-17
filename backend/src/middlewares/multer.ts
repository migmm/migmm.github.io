import multer from 'multer';
import path from 'path';

const storageConfig = (storageOption: string) => {
    if (storageOption === 'local') {
        return multer.diskStorage({
            destination: function (_req, _file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (_req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e12);
                cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
            },
        });
    } else if (storageOption === 's3') {
        return multer.memoryStorage();
    } else if (storageOption === 'db') {
        return multer.memoryStorage();
    }

    throw new Error('Invalid saving option.');
};


const upload = (storageOption: string) => multer({ storage: storageConfig(storageOption) });


export default upload;
