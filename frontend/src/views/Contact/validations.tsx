export const validations = {
    fullName: {
        required: true,
        errorMessage: 'Full name is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Full name must be at least 4 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Full name should only contain letters and numbers.';
            }
            return true;
        },
    },
    telephone: {
        required: false,
        errorMessage: 'Phone number is required.',
        validate: (value: any) => {
            if (value.length < 8) {
                return 'Phone number must be at least 8 characters long.';
            }
            if (!/^\+(?:[0-9] ?){6,14}[0-9]$/g.test(value)) {
                return 'Phone number should be a valid phone number.';
            }
            return true;
        },
    },
    
    email: {
        required: true,
        errorMessage: 'E-mail is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'E-mail must be at least 4 characters long.';
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
            if (value.length < 10) {
                return 'Message must be at least 10 characters long.';
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
