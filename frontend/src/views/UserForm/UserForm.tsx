import React, { useState } from 'react';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import H1 from '../../Styles/H1/H1';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import Label from '../../Styles/Form/Label/Label';
import Input from '../../Styles/Form/Input/Input';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import axios from 'axios';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';
import { initialFields, validations } from '../Contact/validations';


const UserForm = () => {

    const [imagePreview, setImagePreview] = useState('');
    const formData = new FormData();
    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);



    const handleFileChange = (imageData: any) => {
        setImagePreview(imageData);
        handleChange('coverImage', imageData);
    };

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
        handleChange('editorHtml', html);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const base64Image = fields.coverImage;
        const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

        formData.append('coverImage', blob, 'coverImage.jpg');
        formData.append('showInLandPage', showInLandPage ? 'true' : 'false');

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
                    /*   const { status, data } = error.response;
                    if (status === 401) {
                        if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }
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
            <div>
                <H1 innerText='Registration'/>
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                    <InputGroup>
                            <Label
                                htmlFor='name'
                                innerText='Your name *'
                            />
                            <Input
                                type='text'
                                id='name'
                                name='name'
                                value={fields.name}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.name}
                            />

                            <Label
                                htmlFor='charge'
                                innerText='Your charge *'
                            />
                            <Input
                                type='text'
                                id='charge'
                                name='charge'
                                value={fields.charge}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.charge}
                            />

                            <Label
                                htmlFor='location'
                                innerText='Your location *'
                            />
                            <Input
                                type='text'
                                id='location'
                                name='location'
                                value={fields.location}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.location}
                            />

                            <Label
                                htmlFor='linkedin-url'
                                innerText='LINKEDIN URL *'
                            />
                            <Input
                                type='text'
                                id='linkedin-url'
                                name='linkedinURL'
                                value={fields.linkedinURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.linkedinURL}
                            />
                            <Label
                                htmlFor='email'
                                innerText='Email *'
                            />
                            <Input
                                type='text'
                                id='email'
                                name='email'
                                value={fields.email}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.email}
                            />

                            <Label
                                htmlFor='whatsapp'
                                innerText='Whatsapp'
                            />
                            <Input
                                type='text'
                                id='whatsapp'
                                name='whatsapp'
                                value={fields.whatsapp}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.whatsapp}
                            />

                            <Label
                                htmlFor='telegram'
                                innerText='Telegram'
                            />
                            <Input
                                type='text'
                                id='telegram'
                                name='telegram'
                                value={fields.telegram}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.telegram}
                            />

                            <Label
                                htmlFor='youtube-channel'
                                innerText='Youtube Channel'
                            />
                            <Input
                                type='text'
                                id='youtube-channel'
                                name='youtubeChannel'
                                value={fields.youtubeChannel}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.youtubeChannel}
                            />

                            <Label
                                htmlFor='logo'
                                innerText='Your Logo *'
                            />
                            <InputFile
                                setImagePreview={handleFileChange}
                                imagePreview={imagePreview}
                                id='logo'
                                name='logo'
                            />
                            <LabelError
                                innerText={errors.logo}
                            />
                        </InputGroup>

                        <LabelError
                            innerText={error}
                        />

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

export default UserForm;
