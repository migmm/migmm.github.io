import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <FooterStyles>
            <div className="footer-link-container">
                <Link to="/login">π</Link>
            </div>
        </FooterStyles>
    );
};

export default Footer;

const FooterStyles = styled.footer`
    width: 20xp;

    .footer-link-container {
        text-align: right;
        
        a {
            text-decoration: none;
        }
    }
`;
