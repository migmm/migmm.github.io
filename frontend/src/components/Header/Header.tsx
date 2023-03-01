import React from "react";
import HamburgerButton from "./HamburgerButton/HamburgerButton";
import NavBar from "./Navbar/NavBar";
import styled from "styled-components";

const Header = () => (
    <HeaderContainer>
        <header>
            <div className="logo-container">
                <img src="img/logo.png" alt="Logo" />
            </div>
            <div className="navbar-container">
                <NavBar />
            </div>
            <span className="contact-button">Contact me!</span>
            <div className="hamburger-button-container">
                <HamburgerButton />
            </div>
        </header>
    </HeaderContainer>
);

export default Header;

const HeaderContainer = styled.header`
    max-width: 1900px;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    height: 5.5em;
    border: 1px solid #ebebeb;
    border-radius: 2.75em;
    margin: 1em;

    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 1600px;
        padding: 0 2em;
    }

    .logo-container {
        width: 65px;
        height: 65px;
        flex-grow: 1;
        cursor: pointer;

        img {
            //width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .navbar-container {
        display: none;
        @media (min-width: 768px) {
            display: block;
        }
    }

    .contact-button {
        background-color: #ED1B23;
        height: 65px;
        font-family: "Work Sans", sans-serif;
        color: white;
        font-weight: 600;
        line-height:65px;
        font-size: 1em;
        padding: 0 1em;
        border-radius: 20px;
        margin-right: 1em;
        cursor: pointer;

        :hover {
            background-color: #ce030a;
        }

        :active {
            background-color: #ff0000;
        }
    }

    .hamburger-button-container {
        @media (min-width: 768px) {
            display: none;
        }
    }
`;
