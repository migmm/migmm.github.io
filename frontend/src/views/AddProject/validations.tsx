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
        required: true,
        errorMessage: 'Git URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
            }
            return true;
        },
    },
    deployURL: {
        required: true,
        errorMessage: 'Deploy URL is required.',
        validate: (value: any) => {
            if (!/^(?:http|https):\/\/(?:[\w-]+\.)+[\w]+(?:\/[\w-]+)*\/?$/.test(value)) {
                return 'Invalid URL format.';
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
        errorMessage: 'Cover Image is required.',
        validate: (value: any) => {
            if (!value) {
                return 'Cover Image is required.';
            }
            return true;
        },
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
