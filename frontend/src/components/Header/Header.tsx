import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import HamburgerButton from "./HamburgerButton/HamburgerButton";
import NavBar from "./Navbar/NavBar";


const Header = ({ user , homeData }: any) => {
    
    // NavBar
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const data = homeData[0];

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <HeaderStyles>
            <div className="header-container">
                <div className="navbar">
                    <LogoContainer>
                        <Link to="/">
                            <img src={data.logo} alt="Logo" />
                        </Link>
                    </LogoContainer>
                    <div className={`navbar-container ${isMenuOpen ? "menu-open" : ""}`}>
                        <NavBar user={user} closeMenu={closeMenu} />
                    </div>
                    <Link to="/contact">
                        <span className="contact-button">Contact me!</span>
                    </Link>
                    <div className={`hamburger-button-container ${isMenuOpen ? "open" : ""}`} onClick={handleHamburgerClick}>
                        <HamburgerButton />
                    </div>
                </div>
            </div>
        </HeaderStyles>
    );
};

export default Header;

const HeaderStyles = styled.header`
    max-width: 1900px;
    margin: 0 auto;

    .header-container {
        display: flex;
        justify-content: center;
        background-color: #ffffff;
        height: 5.5em;
        border: 1px solid #ebebeb; //#E3E3E3
        border-radius: 2.75em;
        margin: 1em;
        transition: opacity 0.5s;

        .navbar {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 1600px;
            padding: 0 2em;
        }
        
        .navbar-container {
            display: none;

            @media (min-width: 768px) {
                display: flex;
            }
        }

        // Warning
        // Styles affects to Navbar
        .menu-open {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000000;
            z-index: 90;

            a {
                font-size: 2em;
                color: #ffffff;

                @media (hover: hover) {
                    :hover {
                        color: #ed1b23;
                    }
                }

                :active {
                    color: #ff0000;
                }
            }

            li {
                font-size: 1.5em;
                margin: 0.1em;
            }
        }

        // Warning
        // Styles affect to Hamburger button
        .open {
            display: block;
        }

        .hamburger-button-container span {
            transition: all 0.1s ease-in-out;
        }

        .hamburger-button-container.open span:nth-child(1) {
            transform: translateY(13px) translateX(1px) rotate(45deg);
        }

        .hamburger-button-container.open span:nth-child(2) {
            opacity: 0;
        }

        .hamburger-button-container.open span:nth-child(3) {
            transform: translateY(-13px) translateX(1px) rotate(-45deg);
        }

        .contact-button {
            background-color: #ed1b23;
            height: 65px;
            font-family: "Work Sans", sans-serif;
            color: white;
            font-weight: 500;
            line-height: 65px;
            font-size: 1em;
            padding: 0 1em;
            border-radius: 20px;
            margin-right: 1em;
            display: block;
            cursor: pointer;
            text-decoration: none;

            @media (min-width: 768px) {
                display: none;
            }

            @media (hover: hover) {
                :hover {
                    background-color: #ce030a;
                }
            }

            :active {
                background-color: #ff0000;
            }
        }

        a {
            text-decoration: none;
        }

        .hamburger-button-container {
            @media (min-width: 768px) {
                display: none;
            }
        }
    }
`;


const LogoContainer = styled.div` 
    width: 65px;
    height: 65px;
    flex-grow: 1;
    cursor: pointer;

    img {
        height: 100%;
        object-fit: contain;
    }
`;