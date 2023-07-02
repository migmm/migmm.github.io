import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userDB from "../../dummy/userDB";

const Footer = () => {
    return (
        <FooterStyles>
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
                <button className="footer-button">Contact me</button>

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
            <div className="footer-link-container">
                <Link to="/login">π</Link>
            </div>
        </FooterStyles>
    );
};

export default Footer;

const FooterStyles = styled.footer`
    width: 100%;
    background-color: black;
    padding: 20px;
    font-family: "Work Sans", sans-serif;
    color: white;
    .first-column {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: "Work Sans", sans-serif;
        margin: 1em;

        .img-container {
            img {
                width: 65px;
                height: 65px;
            }
        }
        .p-container {
            color: white;
        }
    }

    .second-column {
        font-family: "Work Sans", sans-serif;
        color: white;
        margin: 1em;
        a {
            text-decoration: none;

            :visited {
                color: white;
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
                    color: white;
                }
            }
        }
    }

    .third-column {
        margin: 1em;

        .footer-text {
            margin: 1em 1em 1em 0;
        }

        .footer-button {
            width: 100px;
            height: 50px;
            border-radius: 15px;
            margin: 1em 1em 2em 0;
        }

        .footer-icons {
            a {
                color: white;
                margin: 1em;
            }
        }
    }

    .footer-link-container {
        text-align: right;

        a {
            text-decoration: none;
        }
    }
`;
