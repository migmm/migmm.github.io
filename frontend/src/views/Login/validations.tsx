export const validations = {
    username: {
        required: true,
        errorMessage: 'Username is required.',
        validate: (value: any) => {
            if (value.length < 2) {
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
            if (value.length < 2) {
                return 'Password must be between 8 and 16 characters long.';
            }
            return true;
        },
    },
    commonError: {
        required: false,
        errorMessage: 'An error occurred. Please try again later.',
        userOrPassIncorrect: 'Username or password is incorrect.'
    },
};

export const initialFields = Object.keys(validations).reduce((fields: any, fieldName: any) => {
    fields[fieldName] = '';
    return fields;
}, {});
