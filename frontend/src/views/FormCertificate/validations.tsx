export const validations = {
    courseTitle: {
        required: true,
        errorMessage: 'Certification Name is required.',
        validate: (value: any) => {
            if (value.length < 6) {
                return 'Certification Name must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
                return 'Certification Name should only contain letters and numbers.';
            }
            return true;
        },
    },
    vendor: {
        required: true,
        errorMessage: 'Certification Vendor is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Certification Vendor must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
                return 'Certification Vendor should only contain letters and numbers.';
            }
            return true;
        },
    },
    issueDate: {
        required: true,
        errorMessage: 'Certification Issue Date is required.',
        validate: (value: any) => {
            const dateObject = new Date(value);
            if (isNaN(dateObject.getTime()) || dateObject.getFullYear() < 1900) {
                return 'Certification Issue Date is not a valid date.';
            }
            return true;
        },
    },
    urlCheck: {
        required: true,
        errorMessage: 'Certification URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },
    description: {
        required: true,
        errorMessage: 'Certification Description is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Certification Description must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
                return 'Certification Description should only contain letters and numbers.';
            }
            return true;
        },
    },
    courseImage: {
        required: true,
        errorMessage: 'Certification Image is required.',
        validate: (value: any, formData?: Record<string, string>) => {
            
            if (!value) {
                return 'Certification Image is required.';
            }

            const isBase64PNG = value.startsWith('data:image/png;base64');
            const isBase64JPEG = value.startsWith('data:image/jpeg;base64');
            const isBase64JPG = value.startsWith('data:image/jpg;base64');
            if (!isBase64PNG && !isBase64JPEG && !isBase64JPG) {
                return 'Invalid file format. Only PNG, JPEG, and JPG files are allowed.';
            }

            const imageData = value.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
            const decodedImage = atob(imageData);

            const maxSizeKB = 1024;
            const maxSizeBytes = maxSizeKB * 1024;
            if (decodedImage.length > maxSizeBytes) {
                return 'File size exceeds the maximum limit of 1MB.';
            }

            const maxFileCount = 2; 
            const currentFileCount = Object.values(formData || {}).filter((fieldValue) => fieldValue.startsWith('data:image')).length;
            if (currentFileCount >= maxFileCount) {
            return `You can only upload a maximum of ${maxFileCount} files.`;
            }
            return true;
        }
    },
    commonError: {
        required: false,
        errorMessage: 'An error occurred. Please try again later.',
    },
};

export const initialFields = Object.keys(validations).reduce((fields: any, fieldName: any) => {
    if (fieldName !== 'commonError') {
        fields[fieldName] = '';
    }
    return fields;
}, {});
