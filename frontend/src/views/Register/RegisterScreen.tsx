import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Input from '../../Styles/Form/Input/Input';
import H1 from '../../Styles/H1/H1';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';


const RegisterScreen = () => {

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);
    const navigate = useNavigate();

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils({initialFields});

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        if (validateForm(fields)) {

            const data = Object.keys(fields).reduce((formData : Record<string, any>, fieldName : string) => {
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

            } catch (error : any) {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 401) {
                        if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }
                    } 
                }else {
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
                                htmlFor='username'
                                innerText='Username'
                            />
                            <Input
                                type='text'
                                id='username'
                                name='username'
                                autoComplete='off'
                                value={fields.username}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.username}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label
                                htmlFor='password'
                                innerText='Password'
                            />
                            <Input
                                type='password'
                                id='password'
                                name='password'
                                value={fields.password}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.password}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label
                                htmlFor='repassword'
                                innerText='Confirm Password'
                            />
                            <Input
                                type='password'
                                id='repassword'
                                name='repassword'
                                value={fields.repassword}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.repassword}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label
                                htmlFor='email'
                                innerText='Email'
                            />
                            <Input
                                type='email'
                                id='email'
                                name='email'
                                autoComplete='off'
                                value={fields.email}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError
                                innerText={errors.email}
                            />
                        </InputGroup>

                        <LabelError innerText={error}/>

                        <InputGroup>
                            <Button 
                                type='submit' 
                                disabled={buttonMessage}
                                innerText={buttonMessage ? 'Wait..' : 'Register'}
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

export default RegisterScreen;
