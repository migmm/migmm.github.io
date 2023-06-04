export const validations = {
    username: {
        required: true,
        errorMessage: 'Username is required.',
        existingMessage: 'User already exists.',
        validate: (value: any) => {
            if (value.length < 6) {
                return 'Username must be at least 6 characters long.';
            }
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                return 'Username should only contain letters and numbers.';
            }
            return true;
        },
    },
    password: {
        required: true,
        errorMessage: 'Password is required.',
        validate: (value: any) => {
            if (value.length < 8) {
                return 'Password must be between 8 and 16 characters long.';
            }
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?':{}|<>]).{8,16}$/.test(value)) {
                return 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and two special characters.';
            }
            return true;
        },
    },
    repassword: {
        required: true,
        errorMessage: 'Password repeat is required.',
        validate: (value: any, formData: any) => {
            if (value !== formData.password) {
                return 'Password confirmation does not match.';
            }
            return true;
        },
    },
    email: {
        required: true,
        errorMessage: 'Email is required.',
        existingMessage: 'User already exists.',
        validate: (value: any) => {
            if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{3,})?$/.test(value)) {
                return 'Invalid email format.';
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
    fields[fieldName] = '';
    return fields;
}, {});
