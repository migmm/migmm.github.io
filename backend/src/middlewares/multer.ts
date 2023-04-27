/* import multer from "multer";
import { PRODUCT_IMG_UPLOAD_LOCATION } from "../config/config";


const storage = multer.diskStorage({
    destination: function (_req:any, _file:any, cb:any) {
        const error = null;
        cb(error, PRODUCT_IMG_UPLOAD_LOCATION);
    },
    filename: function (_req:any, file:any, cb:any) {
        const error = null;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
    }
});

const fileFilter = (_req:any, file:any, cb:any) => {
    const validaMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
    cb(null, mimeTypeIsOk);
};

const upload = multer({ storage, fileFilter});

const fieldConfig = upload.single('file')

export default {
    fieldConfig
}

 */
