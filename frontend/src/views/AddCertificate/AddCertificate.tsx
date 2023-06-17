import React, { useState } from 'react';
import axios from 'axios';

import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Input from '../../Styles/Form/Input/Input';
import Textarea from '../../Styles/Form/Textarea/Textarea';
import H1 from '../../Styles/H1/H1';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import InputFile from '../../Styles/Form/InputFile/InputFile';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';
import convertBase64ToBlob from '../../utils/base64toImage';

const AddCertificate = () => {
    const [imagePreview, setImagePreview] = useState('');
    const formData = new FormData();
    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const base64Image = fields.certificationImage;
        const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

        formData.append('certificationImage', blob, 'coverImage.jpg');
        //formData.append('showInLandPage', showInLandPage ? 'true' : 'false');

        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                if (fields.hasOwnProperty(key) && key !== 'showInLandPage' && key !== 'coverImage') {
                    formData.append(key, fields[key]);
                }
            }
        }

        console.log('-- Start Form data --');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        console.log('-- End Form data --');

        if (validateForm(fields)) {
            try {
                const response = await axios.post('http://localhost:8080/api/users', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    /*  navigate('/'); */
                }
            } catch (error: any) {
                if (error.response) {
                    /*   
                    const { status, data } = error.response;
                        if (status === 401) {
                            if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }
                    }  
                  */
                } else {
                    setError(validations.commonError.errorMessage);
                    console.error(error);
                }
            }
        }

        setButtonMessage(false);
    };

    return (
        <CommonStyles>
            <div>
                <H1 innerText='New Certification' />

                <div>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label
                                innerText='Certification title *'
                                htmlFor='certification-name'
                            />
                            <Input
                                type='text'
                                id='certificationName'
                                name='certificationName'
                                value={fields.certificationName}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.certificationName} />

                            <Label
                                innerText='Vendor *'
                                htmlFor='certification-vendor'
                            />
                            <Input
                                type='text'
                                id='certification-vendor'
                                name='certificationVendor'
                                value={fields.certificationVendor}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.certificationVendor} />

                            <Label
                                innerText='URL *'
                                htmlFor='certification-url'
                            />
                            <Input
                                type='text'
                                id='certification-url'
                                name='certificationURL'
                                value={fields.certificationURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.certificationURL} />

                            <Label
                                innerText='Description *'
                                htmlFor='certification-description'
                            />
                            <Textarea
                                id='certification-description'
                                name='certificationDescription'
                                value={fields.certificationDescription}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.certificationDescription} />

                            <Label
                                innerText='Image *'
                                htmlFor='certification-image'
                            />
                            <InputFile
                                setImagePreview={setImagePreview}
                                imagePreview={imagePreview}
                                id='certification-image'
                                name='certificationImage'
                            />
                            <LabelError innerText={errors.certificationImage} />
                        </InputGroup>

                        <LabelError innerText={error} />

                        <InputGroup>
                            <Button
                                type='submit'
                                disabled={buttonMessage}
                                innerText={buttonMessage ? 'Wait..' : 'Add'}
                            />

                            <Button
                                type='reset'
                                onClick={handleReset}
                                innerText='Reset'
                            />
                        </InputGroup>
                    </form>
                </div>
            </div>
        </CommonStyles>
    );
};

export default AddCertificate;
