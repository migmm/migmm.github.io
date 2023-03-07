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

`;
