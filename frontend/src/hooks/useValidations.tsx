import { useState } from 'react';

interface Validations {
    [key: string]: {
        required: boolean;
        errorMessage: string;
        validate?: (value: any, formData?: Record<string, string>) => boolean | string;
        validateErrorMessage?: string;
    };
}

export const useValidation = (validations: Validations) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (fields: Record<string, string>) => {
        const newErrors: Record<string, string> = {};

        Object.entries(validations).forEach(([fieldName, fieldValidation]) => {
            const fieldValue = fields[fieldName];

            if (fieldValidation.required && !fieldValue) {
                newErrors[fieldName] = fieldValidation.errorMessage || 'Field is required.';
            } else if (fieldValidation.validate) {
                const validationResult = fieldValidation.validate(fieldValue, fields); // Pasamos los campos del formulario

                if (typeof validationResult === 'string') {
                    newErrors[fieldName] = validationResult;
                }
            }
        });

        // Validación de la coincidencia entre password y repassword
        if (fields.password && fields.repassword && fields.password !== fields.repassword) {
            newErrors.repassword = 'Password confirmation does not match.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return { errors, validateForm };
};
