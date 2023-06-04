import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../Styles/Form/Button/Button';
import { Label } from '../../Styles/Form/Label/Label';
import { LabelError } from '../../Styles/Form/LabelError/LabelError';
import { Input } from '../../Styles/Form/Input/Input';
import { H1 } from '../../Styles/H1/H1';

import { useValidation } from '../../hooks/useValidations';
import useFormReset from '../../hooks/useFormReset';


const RegisterScreen = () => {
    const validations = {
        username: {
            required: true,
            errorMessage: 'Username is required.',
            existingMessage: 'User already exists.',
            validate: (value: any) => {
                if (value.length < 6) {
                    return 'Username must be at least 6 characters long.';
                }
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    return 'Username should only contain letters and numbers.';
                }
                return true;
            },
        },
        password: {
            required: true,
            errorMessage: 'Password is required.',
            validate: (value: any) => {
                if (value.length < 8) {
                    return 'Password must be between 8 an 16 characters long.';
                }
                if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(value)) {
                    return 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and two special characters';
                }
                return true;
            },
            
        },
        repassword: {
            required: true,
            errorMessage: 'Password repeat is required.',
            validate: (value:any, formData:any) => {
                if (value !== formData.password) {
                    return 'Password confirmation does not match.';
                }
                return true;
            },
        },
        email: {
            required: true,
            errorMessage: 'Email is required.',
            existingMessage: 'User already exists.',
            validate: (value:any) => {
                if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{3,})?$/.test(value)) {
                    return 'Invalid email format';
                }
                return true;
            },
        },
        commonError: {
            required: false,
            errorMessage: 'An error occurred. Please try again later.',
        },
    };

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);

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

        setIsLoading(false);
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
                            <LabelErrorContainer>{errors.username && <LabelError>{errors.username}</LabelError>}</LabelErrorContainer>
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
                            <LabelErrorContainer>{errors.password && <LabelError>{errors.password}</LabelError>}</LabelErrorContainer>
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
                            <LabelErrorContainer>{errors.repassword && <LabelError>{errors.repassword}</LabelError>}</LabelErrorContainer>
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
                            <LabelErrorContainer>{errors.email && <LabelError>{errors.email}</LabelError>}</LabelErrorContainer>
                        </div>
                        <LabelErrorContainer>{errors.commonError && <LabelError>{errors.commonError}</LabelError>}</LabelErrorContainer>
                        {!errors.commonError && error && <LabelError>{error}</LabelError>}
                        <div className='input-group'>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Register'}
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

const LabelErrorContainer = styled.div`
    height: 1.5em;
`;
