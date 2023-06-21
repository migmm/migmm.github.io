import React, { useState } from 'react';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import Button from '../../Styles/Form/Button/Button';
import Input from '../../Styles/Form/Input/Input';
import Label from '../../Styles/Form/Label/Label';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Textarea from '../../Styles/Form/Textarea/Textarea';
import H1 from '../../Styles/H1/H1';
import Paragraph from '../../Styles/Paragraph/Paragraph'
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';

import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';
import axios from 'axios';
import ContainerStyles from '../../Styles/Container/Container';


function Contact() {

    const [buttonMessage, setButtonMessage] = useState(false);
    const [error, setError] = useState('');
    const formData = new FormData();
    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

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
            <ContainerStyles>
                <H1 innerText='Contact' />
                <div>
                    <Paragraph
                        innerText='You can contact me by sending an email to hi@miguedev.com or filling in the following form.'
                    />
                    <div>
                        <form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Label
                                    innerText='Full Name *'
                                    htmlFor='full-name'
                                />
                                <Input
                                    type='text'
                                    name='fullName'
                                    id='full-name'
                                    value={fields.fullName}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <LabelError
                                    innerText={errors.fullName}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label
                                    innerText='Telephone'
                                    id='telephone'
                                />
                                <Input
                                    type='text'
                                    name='telephone'
                                    id='telephone'
                                    value={fields.telephone}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <LabelError
                                    innerText={errors.telephone}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label
                                    innerText='E-mail *'
                                    htmlFor='email'
                                />
                                <Input
                                    type='text'
                                    name='email'
                                    id='email'
                                    value={fields.email}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <LabelError
                                    innerText={errors.email}
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label
                                innerText='Message *'
                                htmlFor='message'
                                />
                                <Textarea
                                    name='message'
                                    id='message'
                                    value={fields.message}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                                <LabelError
                                    innerText={errors.message}
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
            </ContainerStyles>
        </CommonStyles>
    );
}

export default Contact;