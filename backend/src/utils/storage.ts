interface Certification {
    courseImage: string[];
}

const handleFileUpload = (files: Express.Multer.File[], certification: Certification) => {
    const fileNames = files.map((file) => file.filename);
    certification.courseImage = fileNames;
    console.log('Uploaded file names:', fileNames);
};

const convertFilesToBase64 = async (files: Express.Multer.File[]): Promise<string[]> => {
    const base64Files: string[] = [];

    for (const file of files) {
        try {
            const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            base64Files.push(base64);
        } catch (error) {
            console.error(`Error convertig file ${file.originalname} to base64:`, error);
        }
    }

    return base64Files;
};


export { handleFileUpload, convertFilesToBase64 };
