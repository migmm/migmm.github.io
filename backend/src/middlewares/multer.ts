import multer from 'multer';

// Multer configuration to store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
