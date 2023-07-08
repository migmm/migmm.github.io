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
import sampleObject from '../../dummy/certificate';
import { useParams } from 'react-router-dom';


const AddCertificate = () => {

    interface CertificateData {
        id: number | null;
        certificationName: string;
        certificationVendor: string;
        certificationURL:string;
        certificationDescription: string
    }

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
            setCertificateData(sampleObject);
        } else {
            setH1Text('New Project');
            setCertificateData(null);
        }
    }, [certificateId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const base64Image = fields.certificationImage;
        const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

        const data = {
            certificationImage: blob,
            ...fields,
        };

        console.log('Data:', data);

        if (validateForm(fields)) {
            try {
                console.log('send')
                const response = await axios.post(`${apiURL}addcertificate`, data, {
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
                                htmlFor='certification-name'
                            />
                            <Input
                                type='text'
                                id='certificationName'
                                name='certificationName'
                                value={certificateData?.certificationName|| fields.certificationName}
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
                                value={certificateData?.certificationVendor|| fields.certificationVendor}
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
                                value={certificateData?.certificationURL|| fields.certificationURL}
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
                                value={certificateData?.certificationDescription|| fields.certificationDescription}
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
