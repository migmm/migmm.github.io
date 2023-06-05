import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../Styles/Form/Button/Button';
import { Label } from '../../Styles/Form/Label/Label';
import { LabelError } from '../../Styles/Form/LabelError/LabelError';
import { Input } from '../../Styles/Form/Input/Input';
import { H1 } from '../../Styles/H1/H1';
import { validations } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormReset from '../../hooks/useFormReset';


const RegisterScreen = () => {

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);
    const navigate = useNavigate();
    const { errors, validateForm } = useValidation(validations);

    const { fields, handleChange, handleReset } = useFormReset({
        username: '',
        password: '',
        repassword: '',
        email: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        if (validateForm(fields)) {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/users',
                    {
                        username: fields.username,
                        password: fields.password,
                        email: fields.email,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 201) {
                    navigate('/');
                }
                console.log(response);
            } catch (err: any) {
                if (err.response) {
                    const { status, data } = err.response;
                    if (status === 401) {
                        if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }
                    } 
                }else {
                    setError(validations.commonError.errorMessage);
                    console.error(err);
                }
            }
        }

        setButtonMessage(false);
    };

    return (
        <RegisterScreenStyles>
            <div className='contact-container'>
                <H1>Register</H1>
                <div className='register-form-container'>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='input-group'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                type='text'
                                id='username'
                                name='username'
                                value={fields.username}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.username}</LabelError>
                        </div>
                        <div className='input-group'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                type='password'
                                id='password'
                                name='password'
                                value={fields.password}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.password}</LabelError>
                        </div>
                        <div className='input-group'>
                            <Label htmlFor='repassword'>Confirm Password</Label>
                            <Input
                                type='password'
                                id='repassword'
                                name='repassword'
                                value={fields.repassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.repassword}</LabelError>
                        </div>
                        <div className='input-group'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                type='email'
                                id='email'
                                name='email'
                                value={fields.email}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.email}</LabelError>
                        </div>
                        <LabelError>{error}</LabelError>
                        <div className='input-group'>
                            <Button type='submit' disabled={buttonMessage}>
                                {buttonMessage ? 'Loading...' : 'Register'}
                            </Button>
                            <Button type='reset' onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </RegisterScreenStyles>
    );
};

export default RegisterScreen;

const RegisterScreenStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    margin: 1em;

    .register-form-container {
        .input-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .register-container {
            margin: 1em 1em 1em 1em;
            span {
                font-family: 'Work Sans', sans-serif;
                font-weight: 600;
                text-align: center;
            }
        }
    }

    .input-group:last-child {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
`;
