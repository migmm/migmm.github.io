import { useState } from 'react';

export const useFormFields = (initialValues: Record<string, string>) => {
    const [fields, setFields] = useState(initialValues);

    const handleChange = (name: string, value: string) => {
        setFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    return [fields, handleChange] as const;
};
