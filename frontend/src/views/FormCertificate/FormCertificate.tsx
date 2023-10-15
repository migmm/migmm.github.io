import React, { useEffect, useState } from 'react';
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
import { apiURL } from '../../config/urls';
import ButtonGroup from '../../Styles/Form/ButtonGroup/ButtonGroup';
import ContainerStyles from '../../Styles/Container/Container';
import { useParams } from 'react-router-dom';
import { CertificateData } from './Interfaces';


const AddCertificate = () => {

    const [imagePreview, setImagePreview] = useState('');

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const [h1Text, setH1Text] = useState('');

    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

    const { certificateId } = useParams();

    useEffect(() => {
        if (certificateId) {
            setH1Text('Edit');
        } else {
            setH1Text('New Certification');
            setCertificateData(null);
        }
    }, [certificateId]);

    const handleFileChange = (imageData: string) => {
        setImagePreview(imageData);
        handleChange('courseImage', imageData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const base64Image = fields.courseImage;
        const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

        const data = {
            courseImage: blob,
            ...fields,
        };

        console.log('Data:', data);
        console.log(validateForm(fields))
        if (validateForm(fields)) {
            try {
                console.log('send')
                const response = await axios.post(`${apiURL}certifications`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    handleReset();
                }
            } catch (error: any) {
                if (error.response) {
                    /*   const { status, data } = error.response;
                    if (status === 401) {
                        if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }'New Certification'
                    }  */
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
            <ContainerStyles>
                <H1 innerText={h1Text} />
                <div>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label
                                innerText='Certification title *'
                                htmlFor='courseTitle'
                            />
                            <Input
                                type='text'
                                id='courseTitle'
                                name='courseTitle'
                                value={certificateData?.courseTitle|| fields.courseTitle}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.courseTitle} />

                            <Label
                                innerText='Vendor *'
                                htmlFor='vendor'
                            />
                            <Input
                                type='text'
                                id='vendor'
                                name='vendor'
                                value={certificateData?.vendor|| fields.vendor}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.vendor} />

                            <Label
                                innerText='Issue Date *'
                                htmlFor='issueDate'
                            />
                            <Input
                                type='date'
                                id='issueDate'
                                name='issueDate'
                                value={certificateData?.issueDate|| fields.issueDate}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.issueDate} />
                            <Label
                                innerText='URL *'
                                htmlFor='urlCheck'
                            />
                            <Input
                                type='text'
                                id='urlCheck'
                                name='urlCheck'
                                value={certificateData?.urlCheck|| fields.urlCheck}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.urlCheck} />

                            <Label
                                innerText='Description *'
                                htmlFor='description'
                            />
                            <Textarea
                                id='description'
                                name='description'
                                value={certificateData?.description|| fields.description}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.description} />

                            <Label
                                innerText='Image *'
                                htmlFor='courseImage'
                            />

                            <InputFile
                                setImagePreview={handleFileChange }
                                imagePreview={imagePreview}
                                id='courseImage'
                                name='courseImage'
                            />
                            <LabelError innerText={errors.courseImage} />
                        </InputGroup>

                        <LabelError innerText={error} />

                        <ButtonGroup>
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
                        </ButtonGroup>
                    </form>
                </div>
            </ContainerStyles>
        </CommonStyles>
    );
};

export default AddCertificate;
