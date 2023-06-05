import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../Styles/Form/Button/Button';
import { Label } from '../../Styles/Form/Label/Label';
import { LabelError } from '../../Styles/Form/LabelError/LabelError';
import { Input } from '../../Styles/Form/Input/Input';
import { H1 } from '../../Styles/H1/H1';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';


const RegisterScreen = () => {

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);
    const navigate = useNavigate();

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils({initialFields});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        if (validateForm(fields)) {

            const data = Object.keys(fields).reduce((formData : any, fieldName) => {
                formData[fieldName] = fields[fieldName];
                return formData;
            }, {});

            try {
                const response = await axios.post(
                    'http://localhost:8080/api/users',
                        data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 201) {
                    navigate('/');
                }

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
            <div>
                <H1>Registration</H1>
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <InputGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                type='text'
                                id='username'
                                name='username'
                                value={fields.username}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.username}</LabelError>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                type='password'
                                id='password'
                                name='password'
                                value={fields.password}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.password}</LabelError>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='repassword'>Confirm Password</Label>
                            <Input
                                type='password'
                                id='repassword'
                                name='repassword'
                                value={fields.repassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.repassword}</LabelError>
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                                type='email'
                                id='email'
                                name='email'
                                value={fields.email}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.email}</LabelError>
                        </InputGroup>
                        <LabelError>{error}</LabelError>
                        <InputGroup>
                            <Button 
                                type='submit' 
                                disabled={buttonMessage}
                            >
                                {buttonMessage ? 'Wait..' : 'Register'}
                            </Button>
                            <Button 
                                type='reset' 
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </InputGroup>
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
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    :last-child {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
`
