// useResetFields.js
import { useState } from 'react';

const useFormReset = (initialFields: any) => {
    const [fields, setFields] = useState(initialFields);

    const handleReset = () => {
        setFields(initialFields);
    };

    const handleChange = (fieldName: any, value: any) => {
        setFields((prevFields: any) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    return { fields, handleChange, handleReset };
};

export default useFormReset;
