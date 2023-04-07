import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = (props:any) => {

    const className = props.menuAbierto ? 'menu-hamburguesa__items menu-hamburguesa__items--abierto' : 'menu-hamburguesa__items';

    return (
        <NavContainer>
            <nav>
                <ul>
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
                        <Link to="/curriculum">Curriculum</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </NavContainer>
    );
};

export default Navbar;

const NavContainer = styled.nav`

    nav ul {
        display: flex;
        flex-direction: column;
        list-style: none;

        li {
            margin: 0 1em;
        }

        a {
            text-decoration: none;
            color: black;
            font-family: Arial, Helvetica, sans-serif;

            :hover {
                color: #ffffff;
            }

            :active {
                color: #a3a3a3;
            }
        }

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }
`;
