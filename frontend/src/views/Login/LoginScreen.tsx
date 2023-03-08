import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Label } from "../../components/Form/Label/label";


const LoginScreen = () => {
    return (
        <LoginScreenStyles>
            <div className="contact-container">
                <h1>Login</h1>
                <div className="login-form-container">
                    <form action="#">
                        <div className="input-group">
                            <Label htmlFor="user">User</Label>
                            <input type="text" className="user" id="user" />
                            <Label htmlFor="password">Password</Label>
                            <input type="password" className="password" id="password" />
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

    h1 {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        text-align: center;
        margin: 1em 1em 0.5em 1em;
    }

    .login-form-container {
        .input-group {
            display: flex;
            flex-direction: column;

            input {
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                text-align: center;
                font-size: 1em;
                margin-bottom: 1em;
                border-radius: 20px;
                padding: 0.5em;
                border: 1px solid #ebebeb;

                :focus {
                    background-color: #e2e2e2;
                }
            }
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
