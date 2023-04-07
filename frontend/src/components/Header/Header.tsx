import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import HamburgerButton from "./HamburgerButton/HamburgerButton";
import NavBar from "./Navbar/NavBar";
import styled from "styled-components";

const Header = () => {

    const location = useLocation();

        useEffect(() => {
            const headerComponent = document.querySelector(".header-container") as HTMLElement;

            document.addEventListener("scroll", (e) => {

                console.log(window.pageYOffset);
                const scrollTop = window.pageYOffset;
                
                if (scrollTop <= 0 && location.pathname === '/') {
                    headerComponent.style.opacity = "0";
                } else {
                    headerComponent.style.opacity = "1";
                }
            });

            document.addEventListener("wheel", (e) => {

                console.log(e.deltaY);
                const scrollTop = e.deltaY;
                
                if (scrollTop > 50 && location.pathname === '/') {
                    headerComponent.style.opacity = "0";
                } else {
                    headerComponent.style.opacity = "1";
                }
            });


        }, []);

    return (
        
        <HeaderStyles>
            <div className="header-container">
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

     /*    .navbar-container {
            display: block;
            @media (min-width: 768px) {
                display: block;
            }
        } */

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
            cursor: pointer;

            @media (min-width: 768px) {
                display: none;
            }

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
    }
`;
