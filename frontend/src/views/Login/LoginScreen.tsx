import React from "react";
import styled from "styled-components";

const LoginScreen = () => {
    return (
        <LoginScreenStyles>
            <div className="contact-container">
                <h1>Contact</h1>
                <div className="login-form-container">
                    <form action="#">
                        <div className="input-group">
                            <label htmlFor="user" className="user-label">
                                User
                            </label>
                            <input type="text" className="user" id="user" />
                            <label htmlFor="password" className="password-label">
                                Password
                            </label>
                            <input type="password" className="password" id="password" />
                        </div>
                        <div className="register-container">
                            <span>
                                Doesn't have an account? <span>Register</span>
                            </span>
                        </div>
                        <div className="input-group">
                            <button type="submit">Login</button>
                            <button type="reset">Reset</button>
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

            label {
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                text-align: center;
                margin-bottom: 0.5em;
            }

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
        button {
            border-radius: 20px;
            padding: 1em;
            border: 1px solid #ebebeb;
            background-color: #0069c5;
            color: #ffffff;
            font-family: "Work Sans", sans-serif;
            font-weight: 600;
            text-align: center;
            font-size: 1em;
            width: 50%;
            cursor: pointer;

            :hover {
                background-color: #004a8b;
            }

            :active {
                background-color: #0088ff;
            }
        }
    }

    .input-group:last-child {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
`;
