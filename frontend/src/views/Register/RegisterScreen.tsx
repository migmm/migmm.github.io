import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../Styles/Form/Button/Button';
import { Label } from '../../Styles/Form/Label/Label';
import { LabelError } from '../../Styles/Form/LabelError/LabelError';
import { Input } from '../../Styles/Form/Input/Input';
import { H1 } from '../../Styles/H1/H1';
import { useFormFields } from '../../hooks/useFormFields';

const RegisterScreen: React.FC = () => {
    const [fields, handleChange] = useFormFields({
        username: '',
        password: '',
        repassword: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const validateForm = () => {
        const validations: Record<string, { required: boolean; errorMessage: string; validate?: () => boolean; validateErrorMessage?: string }> = {
            username: {
                required: true,
                errorMessage: 'Username is required.',
            },
            password: {
                required: true,
                errorMessage: 'Password is required.',
            },
            repassword: {
                required: true,
                errorMessage: 'Password repeat is required.',
                validate: () => fields.password === fields.repassword,
                validateErrorMessage: 'Passwords do not match.',
            },
            email: {
                required: true,
                errorMessage: 'Email is required.',
                validate: () => /\S+@\S+\.\S+/.test(fields.email),
                validateErrorMessage: 'Invalid email format.',
            },
        };

        const errors: Record<string, string> = {};

        Object.entries(validations).forEach(([fieldName, fieldValidation]) => {
            if (fieldValidation.required && !fields[fieldName]) {
                errors[fieldName] = fieldValidation.errorMessage;
            }

            Object.entries(validations).forEach(([fieldName, fieldValidation]) => {
                const fieldValue = fields[fieldName];

                if (fieldValidation.required && !fieldValue) {
                    errors[fieldName] = fieldValidation.errorMessage;
                }

                if (fieldValidation.validate && !fieldValidation.validate()) {
                    errors[fieldName] = fieldValidation.validateErrorMessage || '';
                }
            });
        });

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (validateForm()) {
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
                            setValidationErrors((prevErrors) => ({
                                ...prevErrors,
                                username: 'Username already exists.',
                            }));
                        } else if (data.message === 'Existing email') {
                            setValidationErrors((prevErrors) => ({
                                ...prevErrors,
                                email: 'Email already exists.',
                            }));
                        }
                    } else {
                        setError('An error occurred. Please try again later.');
                        console.error(error);
                    }
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
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                type='text'
                                id='username'
                                name='username'
                                value={fields.username}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelErrorContainer>
                                {validationErrors.username && <LabelError>{validationErrors.username}</LabelError>}
                            </LabelErrorContainer>
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
                            <LabelErrorContainer>
                                {validationErrors.password && <LabelError>{validationErrors.password}</LabelError>}
                            </LabelErrorContainer>
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
                            <LabelErrorContainer>{validationErrors.password && <LabelError>{validationErrors.password}</LabelError>}</LabelErrorContainer>
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
                            <LabelErrorContainer>{validationErrors.email && <LabelError>{validationErrors.email}</LabelError>}</LabelErrorContainer>
                        </div>
                        {error && <LabelError>{error}</LabelError>}
                        <div className='input-group'>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Register'}
                            </Button>
                            <Button type='reset'>Reset</Button>
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
    height: 1.5em; /* Establece una altura fija */
`;
