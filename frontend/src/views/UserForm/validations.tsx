export const validations = {
    name: {
        required: true,
        errorMessage: 'Your name is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Your name must be at least 4 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Your name should only contain letters and numbers.';
            }
            return true;
        },
    },

    jobTitle: {
        required: true,
        errorMessage: 'Job title is required.',
        validate: (value: any) => {
            if (value.length < 6) {
                return 'Job title must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Job title should only contain letters and numbers.';
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

    githubURL: {
        required: true,
        errorMessage: 'Git URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },

    linkedinURL: {
        required: true,
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

    whatsappNumber: {
        required: false,
        errorMessage: 'Whatsapp number number is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Whatsapp number number must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Whatsapp number number should only contain letters and numbers.';
            }
            return true;
        },
    },

    telegramId: {
        required: false,
        errorMessage: 'Telegram ID is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Telegram ID must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Telegram ID should only contain letters and numbers.';
            }
            return true;
        },
    },

    youtubeChannel: {
        required: false,
        errorMessage: 'Youtube channel URL is required.',
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
