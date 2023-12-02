import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Input from '../../Styles/Form/Input/Input';
import H1 from '../../Styles/H1/H1';
import ContainerStyles from '../../Styles/Container/Container';

import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import ButtonGroup from '../../Styles/Form/ButtonGroup/ButtonGroup';
import useFormUtils from '../../hooks/useFormUtils';
import { useAppUser } from '../../context/UserContext'; 

import { apiURL } from '../../config/urls';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


const LoginScreen: React.FC = () => {

    const [buttonMessage, setButtonMessage] = useState(false);
    const [error, setError] = useState('');
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);
    const { errors, validateForm } = useValidation(validations);
    const { updateUser } = useAppUser();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const data = {
            ...fields,
        }
        
        console.log(validateForm(fields))
        if (validateForm(fields)) {
            try {
                const response = await axios.post(
                    `${apiURL}auth`, 
                    data, 
                    {
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 201) {
                    const { accessToken } = response.data;
                    const decodedToken = jwtDecode(accessToken);
                    updateUser(decodedToken);

                    const tokenString = JSON.stringify(accessToken);
                    Cookies.set('token', tokenString, {
                        /*  
                        secure: true, 
                        httpOnly: true 
                        */ 
                    });
                    navigate('/');
                }
            } catch (error: any) {
                if (error.response) {
                        const { status } = error.response;
                    if (status === 401) {
                        console.log(error)
                            setError(validations.commonError.userOrPassIncorrect);
                    } 
                } else {
                    console.log(error)
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
                                innerText='Username'
                                htmlFor='username'
                            />
                            <Input
                                type='text'
                                id='username'
                                name='username'
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

                        <ButtonGroup>
                            <Button
                                type='submit'
                                disabled={buttonMessage}
                                innerText={buttonMessage ? 'Wait..' : 'Login'}
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

export default LoginScreen;
