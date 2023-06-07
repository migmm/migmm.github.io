import React from "react";
import styled from "styled-components";
import Button from "../../Styles/Form/Button/Button";
import Input from "../../Styles/Form/Input/Input";
import Label from "../../Styles/Form/Label/Label";
import LabelError from "../../Styles/Form/LabelError/LabelError";
import Textarea from "../../Styles/Form/Textarea/Textarea";
import H1 from "../../Styles/H1/H1";
import Paragraph from "../../Styles/Paragraph/Paragraph"

function Contact() {
    return (
        <Contactstyles>
            <div className="contact-container">
                <H1>Contact</H1>
                <div className="column-container">
                    <Paragraph>You can contact me by sending an email to hi@miguedev.com or filling in the following form</Paragraph>
                    <div className="form-container">
                        <form action="#">
                            <div className="input-group">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input type="text" id="full-name" />
                                <LabelError> Error </LabelError>
                            </div>
                            <div className="input-group">
                                <Label htmlFor="telephone">Telephone</Label>
                                <Input type="text" id="telephonee" />
                                <LabelError> Error </LabelError>
                            </div>
                            <div className="input-group">
                                <Label htmlFor="mail">E-mail</Label>
                                <Input type="text" id="mail" />
                                <LabelError> Error </LabelError>
                            </div>
                            <div className="input-group">
                                <Label htmlFor="message">Message</Label>
                                <Textarea name="message" id="message"></Textarea>
                                <LabelError> Error </LabelError>
                            </div>
                            <div className="input-group">
                                <Button type="submit">Send</Button>
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

        .column-container {

            .form-container {

                .input-group {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
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
