import React from "react";
import styled from "styled-components";

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
                                <label htmlFor="full-name" className="full-name-label">
                                    Name
                                </label>
                                <input type="text" className="full-name" id="full-name" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="telephone" className="telephone">
                                    Telephone
                                </label>
                                <input type="text" className="telephone" id="telephonee" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="mail" className="mail">
                                    E-mail
                                </label>
                                <input type="text" className="mail" id="mail" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="message" className="message">
                                    Message
                                </label>
                                <textarea name="message" id="message"></textarea>
                            </div>
                            <div className="input-group">
                                <button type="submit">Submit</button>
                                <button type="reset">Reset</button>
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

                    label {
                        font-family: "Work Sans", sans-serif;
                        font-weight: 600;
                        text-align: center;
                        margin-bottom: 0.5em;
                    }

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
            }
        }
    }
`;
