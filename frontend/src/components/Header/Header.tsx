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
    height: 4em;
    border-radius: 2em;
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
        width: 50px;
        height: 50px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .navbar-container {
        display: none;
        @media (min-width: 768px) {
            display: block;
        }
    }

    .hamburger-button-container {
        @media (min-width: 768px) {
            display: none;
        }
    }
`;
