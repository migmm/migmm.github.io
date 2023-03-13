import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Label } from "../../components/Form/Label/Label";
import { LabelError } from "../../components/Form/LabelError/LabelError";
import { Input } from "../../components/Form/Input/Input";
import { H1 } from "../../Styles/H1/H1";


const LoginScreen = () => {
    return (
        <LoginScreenStyles>
            <div className="contact-container">
                <H1>Login</H1>
                <div className="login-form-container">
                    <form action="#">
                        <div className="input-group">
                            <Label htmlFor="user">User</Label>
                            <Input type="text" id="user"/>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" />
                            <LabelError>Error</LabelError>
                        </div>
                        <div className="register-container">
                            <span>
                                Doesn't have an account? <span>Register</span>
                            </span>
                        </div>
                        <div className="input-group">
                            <Button type="submit">Login</Button>
                            <Button type="reset">Reset</Button>
                        </div>
                    </form>
                </div>
            </div>
        </LoginScreenStyles>
    );
};

export default LoginScreen;

const LoginScreenStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    margin: 1em;


    .login-form-container {
        
        .input-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .register-container {
            margin: 1em 1em 1em 1em;
            span {
                font-family: "Work Sans", sans-serif;
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
