import { useState } from 'react';

const useFormUtils = (initialFields: any) => {
    const [fields, setFields] = useState(initialFields);

    const handleReset = () => {
        setFields(initialFields);
    };

    const handleChange = (fieldName: string, value: any) => {
        setFields((prevFields: any) => ({
          ...prevFields,
          [fieldName]: value,
        }));
      };

    return { fields, handleChange, handleReset };
};

export default useFormUtils;
