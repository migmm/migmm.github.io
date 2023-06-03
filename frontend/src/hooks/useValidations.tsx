import { useState } from "react";

interface Validations {
    [key: string]: {
        required: boolean;
        errorMessage: string;
        validate?: () => boolean;
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
                newErrors[fieldName] = fieldValidation.errorMessage;
            }

            if (fieldValidation.validate && !fieldValidation.validate()) {
                newErrors[fieldName] = fieldValidation.validateErrorMessage || "";
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return { errors, validateForm };
};
