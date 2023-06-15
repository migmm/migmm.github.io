export const validations = {
    fullName: {
        required: true,
        errorMessage: 'Full name is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Full name must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Full name should only contain letters and numbers.';
            }
            return true;
        },
    },
    telephone: {
        required: true,
        errorMessage: 'Telephone is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Telephone must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Telephone should only contain letters and numbers.';
            }
            return true;
        },
    },
    
    email: {
        required: true,
        errorMessage: 'E-mail is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'E-mail must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'E-mail should only contain letters and numbers.';
            }
            return true;
        },
    },
    
    message: {
        required: true,
        errorMessage: 'Message is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Message must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Message should only contain letters and numbers.';
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
