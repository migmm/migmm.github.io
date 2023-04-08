import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = (props:any) => {


    return (
        <NavContainer>
            <nav >
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
        flex-direction: column;
        list-style: none;
        display: flex;
        flex-direction: column;
            @media (min-width: 768px) {
                flex-direction: row;
            }

        li {
            margin: 0 1em;
        }

        a {
            text-decoration: none;
            color: #000000;
            font-family: Arial, Helvetica, sans-serif;

            :hover {
                color: #ffffff;
            }

            :active {
                color: #a3a3a3;
            }

            @media (min-width: 768px) {
                color: #000000;
            }
        }

        .open-menu {
            display:flex;
        }

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }
`;
