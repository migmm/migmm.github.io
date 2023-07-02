import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userDB from "../../dummy/userDB";

const Footer = () => {
    return (
        <FooterStyles>
            <div className="footer-content">
            <div className="first-column">
                <div className="img-container">
                    <img src={userDB.logo} alt="Logo" />
                </div>
                <div className="p-container">
                    <h2>miguedev</h2>
                </div>
            </div>
            <div className="second-column">
                <h3>Sections</h3>
                <ul className="link-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link to="/certificates">Certificates</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="third-column">
                <h3>Get in touch</h3>
                <p className="footer-text">Feel free to reach out to me by sending a message now, and I'll make sure to reply as soon as possible.</p>
                <button className="footer-button">Contact me!</button>

                <div className="footer-icons">
                    <a href="http://www.github.com/project1" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github fa-2x"></i>
                    </a>
                    <a href="http://www.linkedin.com.com/profile" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin fa-2x"></i>
                    </a>
                    <a href="mail@mail.com" target="_blank" rel="noreferrer">
                        <i className="fa fa-envelope fa-2x"></i>
                    </a>
                    <a href="4934934934" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-whatsapp fa-2x"></i>
                    </a>
                    <a href="fdfdf" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-telegram fa-2x"></i>
                    </a>
                    <a href="http://www.youtube.com/project1" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-youtube fa-2x"></i>
                    </a>
                </div>
            </div>
            
            </div>

            <div className="footer-copyright">
                <p className="copyright-text"> ©{new Date().getFullYear()} miguedev | All rights reserved</p>
                <div className="hidden-link-container">
                    <Link to="/login">π</Link>
                </div>
                
            </div>
        </FooterStyles>
    );
};

export default Footer;
const FooterStyles = styled.footer`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }

    width: 100%;
    background-color: #020d14;
    font-family: "Work Sans", sans-serif;
    color: #F3F3F1;
.footer-content {


    .first-column {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: "Work Sans", sans-serif;
        margin: 1em;

        @media (min-width: 768px) {
            width:30%;
        }

        .img-container {
            img {
                width: 65px;
                height: 65px;
            }
        }
        .p-container {
            color: #F3F3F1;
        }
    }

    .second-column {
        font-family: "Work Sans", sans-serif;
        color: #F3F3F1;
        margin: 1em;

        @media (min-width: 768px) {
            width:30%;
        }

        a {
            text-decoration: none;

            :visited {
                color: #F3F3F1;
            }
        }
        .link-list {
            list-style: none; /* Eliminar las viñetas */
            padding: 0;
            margin-top:1em;

            li {
                margin-bottom: .5em;

                a {
                    text-decoration: none;
                    color: #F3F3F1;
                }
            }
        }
    }

    .third-column {
        margin: 1em;

        @media (min-width: 768px) {
            width:30%;
        }

        .footer-text {
            margin: 1em 1em 1em 0;
        }

        .footer-button {
            background-color: #ed1b23;
            height: 65px;
            font-family: 'Work Sans', sans-serif;
            color: #F3F3F1;
            font-weight: 500;
            line-height: 65px;
            font-size: 1em;
            padding: 0 1em;
            border-radius: 20px;
            border: none;
            margin-right: 1em;
            cursor: pointer;
            margin: 1em 1em 2em 0;

            @media (hover: hover) {
                :hover {
                    background-color: #ce030a;
                }
            }

            :active {
                background-color: #ff0000;
            }
        }

        .footer-icons {
            a {
                color: #F3F3F1;
                margin: 1em;
                :hover {
                    color:grey;
                }
            }
        }
    }
}
    .footer-copyright {
        background-color: #000000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;


        .hidden-link-container {
            position: absolute;
            right: 0;
            a {
                color: #000000;
                text-decoration: none;
                :hover {
                    color: #000000;
                }
            }
            
        }

        .copyright-text {
            padding: 1em;
        }
    }
`;
