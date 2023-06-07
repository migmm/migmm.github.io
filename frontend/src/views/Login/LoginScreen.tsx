import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Styles/Form/Button/Button";
import Label from "../../Styles/Form/Label/Label";
import LabelError from "../../Styles/Form/LabelError/LabelError";
import Input from "../../Styles/Form/Input/Input";
import H1 from "../../Styles/H1/H1";


const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (name: string, value: string) => {
        if (name === "user") {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!username) {
            errors.username = "Username is required.";
        }

        if (!password) {
            errors.password = "Password is required.";
        }
        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (validateForm()) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/auth",
                    { username, password },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 201) {
                    navigate("/");
                }
                console.log(response);

            } catch (err:any) {
                if (err.response && err.response.status === 400) {
                    setError("Invalid username or password.");
                } else {
                    setError("An error occurred. Please try again later.");
                    console.error(error)
                }
            }
        }
        setIsLoading(false);
    };

    return (
        <LoginScreenStyles>
            <div className="contact-container">
                <H1>Login</H1>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <Label htmlFor="user">User</Label>
                            <Input type="text" id="user" name="user" onChange={(e : any) => handleChange(e.target.name, e.target.value)} />
                            <InvisibleLabelError visible={!!validationErrors.username}>{validationErrors.username}</InvisibleLabelError>
                        </div>
                        <div className="input-group">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" onChange={(e) => handleChange(e.target.name, e.target.value)} />
                            <InvisibleLabelError visible={!!validationErrors.password}>{validationErrors.password}</InvisibleLabelError>
                        </div>
                        <InvisibleLabelError visible={!!error}>{error}</InvisibleLabelError>
                        <div className="input-group">
                            <Button type="submit" disabled={isLoading}>{isLoading ? "Please wait..." : "Login"}</Button>
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

const InvisibleLabelError = styled(LabelError)`
    visibility: ${({ visible }: { visible: boolean }) => (visible ? "visible" : "hidden")};
    ::after {
        content: ".";
        display: inline-block;
        height: 0;
        visibility: hidden;
    }
`;