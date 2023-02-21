import React from "react";
import styled from "styled-components";

function Contact() {
    return <ContactContainer>

    <h1>Contact</h1>
            <div className="first">
                <p>You can contact me sending a form or in a links below</p>
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
                    </form>
                </div>
            </div>
            
    </ContactContainer>;
}

export default Contact;


const ContactContainer = styled.header`

`