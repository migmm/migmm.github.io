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
           /*  if (value.length < 8) {
                return 'Password must be between 8 and 16 characters long.';
            }
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?':{}|<>]).{8,16}$/.test(value)) {
                return 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and two special characters.';
            } */
            return true;
        },
    },
    showInLandPage: {
        required: false,
        errorMessage: 'Check this to view this project in landpage.',
        validate: (value: any, formData: any) => {
     /*        if (value !== formData.password) {
                return 'Password confirmation does not match.';
            } */
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
            /* if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{3,})?$/.test(value)) {
                return 'Invalid email format.';
            } */
            return true;
        },
    },
    longDescription: {
        required: true,
        errorMessage: 'Long Description is required.',
        validate: (value: any) => {
           /*  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{3,})?$/.test(value)) {
                return 'Invalid email format.';
            } */
            return true;
        },
    },
    commonError: {
        required: false,
        errorMessage: 'An error occurred. Please try again later.',
    },
};

export const initialFields = Object.keys(validations).reduce((fields: any, fieldName: any) => {
    fields[fieldName] = '';
    return fields;
}, {});
