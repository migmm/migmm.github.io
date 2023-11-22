export const validations = {
    fullName: {
        required: true,
        errorMessage: 'Full name is required.',
        validate: (value: any) => {
            if (value.length < 4) {
                return 'Full name must be at least 4 characters long.';
            }
            if (!/^[\s\S]+$/.test(value)) {
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
            if (!/^\+?\d{1,4}(?:\s?\d{1,4}){1,4}$/.test(value)) {
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
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(value)) {
                return 'Please write a valid email.';
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
            if (!/^[\s\S]+$/.test(value)) {
                return 'Message should only contain letters and numbers.';
            }
            return true;
        },
    },
    
    commonError: {
        required: false,
        errorMessage: 'An error occurred. Please try again later.',
    },
    serverError: {
        required: false,
        errorMessage: 'Too many request, wait 60 min and try again.',
    },
};

export const initialFields = Object.keys(validations).reduce((fields: any, fieldName: any) => {
    if (fieldName !== 'commonError') {
        fields[fieldName] = '';
    }
    return fields;
}, {});
