export const validations = {
    projectName: {
        required: true,
        errorMessage: 'Project title is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Project title must be at least 4 characters long.';
            }
            if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
                return 'Project title should only contain letters and numbers.';
            }
            return true;
        },
    },
    projectStatus: {
        required: true,
        errorMessage: 'Project status is required.',
        validate: (value: any) => {
            return true;
        },
    },
    showInLandPage: {
        required: false,
        errorMessage: 'Check this to view this project in landpage.',
    },
    gitURL: {
        required: false,
        errorMessage: 'Git URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },
    deployURL: {
        required: false,
        errorMessage: 'Deploy URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)?(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },
    tags: {
        required: true,
        errorMessage: 'At least one tag is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'The tag must be at least 4 characters long.';
            }
            if (!/^[a-zA-Z0-9, ]+$/.test(value)) {
                return 'Project title should only contain letters, numbers and commas.';
            }
            return true;
        },
    },
    shortDescription: {
        required: true,
        errorMessage: 'Short Description is required.',
        validate: (value: any) => {
            if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|\\;:'",.<>/?]+$/.test(value)) {
                return 'Invalid characters.';
            }
            return true;
        },
    },
    coverImage: {
        required: true,
        errorMessage: 'Project Image is required.',
        validate: (value: any, formData?: Record<string, string>) => {
            
            if (!value) {
                return 'Project Image is required.';
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
    editorHtml: {
        required: true,
        errorMessage: 'Long Description is required.',
        validate: (value: any) => {
            if (!value) {
                return 'Cover Image is required.';
            }
            return true;
        },
    },
    titleCheck: {
        required: false,
        errorMessage: 'Text format is required.',
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
