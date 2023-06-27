import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Input from '../../Styles/Form/Input/Input';
import H1 from '../../Styles/H1/H1';
import ContainerStyles from '../../Styles/Container/Container';
import { apiURL } from '../../config/urls';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';

import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';


const LoginScreen: React.FC = () => {

    const [buttonMessage, setButtonMessage] = useState(false);
    const [error, setError] = useState('');
    const formData = new FormData();
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);
    const { errors, validateForm } = useValidation(validations);

    const navigate = useNavigate();

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
                const response = await axios.post(`${apiURL}contact`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    navigate('/'); 
                }
            } catch (error: any) {
                if (error.response) {
                        const { status } = error.response;
                    if (status === 401) {
                            setError(validations.commonError.userOrPassIncorrect);
                    } 
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
                <H1 innerText='Login'/>
                <div>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label
                                innerText='User'
                                htmlFor='user'
                            />
                            <Input
                                type='text'
                                id='user'
                                name='user'
                                onChange={(e : any) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.user}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label
                                innerText='Password'
                                htmlFor='password'
                            />
                            <Input
                                type='password'
                                id='password'
                                name='password'
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.password}
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
            </ContainerStyles>
        </CommonStyles>
    );
};

export default LoginScreen;
