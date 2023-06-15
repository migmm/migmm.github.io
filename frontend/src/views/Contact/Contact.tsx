import React from "react";
import CommonStyles from "../../Styles/CommonStyles/CommonStyles";
import Button from "../../Styles/Form/Button/Button";
import Input from "../../Styles/Form/Input/Input";
import Label from "../../Styles/Form/Label/Label";
import LabelError from "../../Styles/Form/LabelError/LabelError";
import Textarea from "../../Styles/Form/Textarea/Textarea";
import H1 from "../../Styles/H1/H1";
import Paragraph from "../../Styles/Paragraph/Paragraph"
import InputGroup from "../../Styles/Form/InputGroup/InputGroup";

function Contact() {
    return (
        <CommonStyles>
            <div>
                <H1 innerText='Contact' />
                <div>
                    <Paragraph>You can contact me by sending an email to hi@miguedev.com or filling in the following form</Paragraph>
                    <div>
                        <form action="#">
                            <InputGroup>
                                <Label
                                    innerText='Full Name'
                                    htmlFor="full-name"
                                />
                                <Input
                                    type="text"
                                    name="full-name"
                                    id="full-name"
                                />
                                <LabelError> Error </LabelError>
                            </InputGroup>

                            <InputGroup>
                                <Label
                                    innerText='Telephone'
                                    id="telephone"
                                />
                                <Input
                                    type="text"
                                    name="telephonee"
                                    id="telephonee"
                                />
                                <LabelError> Error </LabelError>
                            </InputGroup>

                            <InputGroup>
                                <Label
                                    innerText='E-mail'
                                    htmlFor="mail"
                                />
                                <Input
                                    type="text"
                                    name="mail"
                                    id="mail"
                                />
                                <LabelError> Error </LabelError>
                            </InputGroup>

                            <InputGroup>
                                <Label
                                innerText='Message'
                                htmlFor="message"
                                />
                                <Textarea
                                    name="message"
                                    id="message"
                                />
                                <LabelError> Error </LabelError>
                            </InputGroup>

                            <InputGroup>
                                <Button type="submit">Send</Button>
                                <Button type="reset">Reset</Button>
                            </InputGroup>
                        </form>
                    </div>
                </div>
            </div>
        </CommonStyles>
    );
}

export default Contact;