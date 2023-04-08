import React, { useState } from "react";
import styled from "styled-components";

const HamburgerButton = () => {
    return (
        <BurgerButton>
            <div className="icon nav-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </BurgerButton>
    );
};

export default HamburgerButton;

const BurgerButton = styled.nav`
    border-radius: 50%;
    background-color: #242424;
    padding: 0.4em;
    margin-right: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 65px;

    .nav-icon {
        width: 35px;
        height: 30px;
        margin: 10px 10px;
        position: relative;
        cursor: pointer;
        display: inline-block;
        z-index: 100;
    }

    .nav-icon span {
        background-color: #f3f3f1;
        position: absolute;
        border-radius: 2px;
        transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
        width: 100%;
        height: 4px;
        transition-duration: 250ms;
    }
    .nav-icon span:nth-child(1) {
        top: 0px;
        left: 0px;
    }
    .nav-icon span:nth-child(2) {
        top: 13px;
        left: 0px;
        opacity: 1;
    }
    .nav-icon span:nth-child(3) {
        bottom: 0px;
        left: 0px;
    }
    .nav-icon:not(.open):hover span:nth-child(1) {
        transform: rotate(-3deg) scaleY(1.1);
    }
    .nav-icon:not(.open):hover span:nth-child(2) {
        transform: rotate(3deg) scaleY(1.1);
    }
    .nav-icon:not(.open):hover span:nth-child(3) {
        transform: rotate(-4deg) scaleY(1.1);
    }
    .nav-icon.open span:nth-child(1) {
        transform: rotate(45deg);
        top: 13px;
    }
    .nav-icon.open span:nth-child(2) {
        opacity: 0;
    }
    .nav-icon.open span:nth-child(3) {
        transform: rotate(-45deg);
        top: 13px;
    }
`;
