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
                    <p>miguedev</p>
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
                <p></p>
                <button></button>
                <div>
                    
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
    .first-column {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: "Work Sans", sans-serif;
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
        a {
            text-decoration: none;

            :visited {
                color: white;
            }
        }
        .link-list {
            list-style: none; /* Eliminar las viñetas */
            padding: 0;
            margin: 0;

            li {
                margin-left: 1em;

                a {
                    text-decoration: none;
                    color: white;
                }
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
