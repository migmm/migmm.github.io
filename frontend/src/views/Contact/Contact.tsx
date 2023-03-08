import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Label } from "../../components/Form/Label/Label";


function Contact() {
    return (
        <Contactstyles>
            <div className="contact-container">
                <h1>Contact</h1>
                <div className="column-container">
                    <p className="column-text">You can contact me sending a mail to hi@miguedev.com or completing the form below.</p>
                    <div className="form-container">
                        <form action="#">
                            <div className="input-group">
                                <Label htmlFor="full-name">Full Name</Label>
                                <input type="text" className="full-name" id="full-name" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="telephone">Telephone</Label>
                                <input type="text" className="telephone" id="telephonee" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="mail">E-mail</Label>
                                <input type="text" className="mail" id="mail" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="message">Message</Label>
                                <textarea name="message" id="message"></textarea>
                            </div>
                            <div className="input-group">
                                <Button type="submit">Login</Button>
                                <Button type="reset">Reset</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Contactstyles>
    );
}

export default Contact;

const Contactstyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

    .contact-container {
        margin: 1em;

        h1 {
            font-family: "Work Sans", sans-serif;
            font-weight: 800;
            text-align: center;
            margin: 1em 1em 0.5em 1em;
        }
        .column-container {
            .column-text {
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 1em 1em 0.5em 1em;
            }
            .form-container {
                .input-group {
                    display: flex;
                    flex-direction: column;

                    input,
                    textarea {
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

                    textarea {
                        resize: vertical;
                        height: 10em;
                    }
                }
                .input-group:last-child {
                    display: flex;
                    flex-direction: row;
                    gap: 1em;
                }
            }
        }
    }
`;
