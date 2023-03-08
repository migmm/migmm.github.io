import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Input } from "../../components/Form/Input/Input";
import { Label } from "../../components/Form/Label/Label";
import { Textarea } from "../../components/Form/Textarea/Textarea";


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
                                <Input type="text" id="full-name" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="telephone">Telephone</Label>
                                <Input type="text" id="telephonee" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="mail">E-mail</Label>
                                <Input type="text" id="mail" />
                            </div>
                            <div className="input-group">
                                <Label htmlFor="message">Message</Label>
                                <Textarea name="message" id="message"></Textarea>
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
