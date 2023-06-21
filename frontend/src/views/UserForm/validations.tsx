export const validations = {
    projectName: {
        required: true,
        errorMessage: 'Project title is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Project title must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Project title should only contain letters and numbers.';
            }
            return true;
        },
    },

    charge: {
        required: true,
        errorMessage: 'Charge is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Charge must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Charge should only contain letters and numbers.';
            }
            return true;
        },
    },

    location: {
        required: true,
        errorMessage: 'Location is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Location must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Location should only contain letters and numbers.';
            }
            return true;
        },
    },

    
    gitURL: {
        required: true,
        errorMessage: 'Git URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },
    linkedin: {
        required: false,
        errorMessage: 'Linkedin URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },

    email: {
        required: true,
        errorMessage: 'Email is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Email must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Email should only contain letters and numbers.';
            }
            return true;
        },
    },

    whatsapp: {
        required: true,
        errorMessage: 'Whatsapp number is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Whatsapp number must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Whatsapp number should only contain letters and numbers.';
            }
            return true;
        },
    },

    telegram: {
        required: true,
        errorMessage: 'Telegram is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Telegram must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Telegram should only contain letters and numbers.';
            }
            return true;
        },
    },

    youtube: {
        required: false,
        errorMessage: 'Youtube URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },

    logo: {
        required: true,
        errorMessage: 'Logo image is required.',
        validate: (value: any, formData?: Record<string, string>) => {
            
            if (!value) {
                return 'Logo image is required.';
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
