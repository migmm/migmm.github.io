import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = (props: any, { user }: any) => {
    return (
        <NavContainer>
            <nav>
                <ul>
                    <li>
                        <Link to='/' onClick={props.closeMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to='/projects' onClick={props.closeMenu}>Projects</Link>
                    </li>
                    <li>
                        <Link to='/certificates' onClick={props.closeMenu}>Certificates</Link>
                    </li>
                    {user && user.roles.includes('admin') && (
                    <li>
                        <Link to='/curriculum' onClick={props.closeMenu}>Curriculum</Link>
                    </li>
                    )}
                    <li>
                        <Link to='/contact' onClick={props.closeMenu}>Contact</Link>
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
            font-size: 1.3em;
            color: #000000;
            font-family: "Work Sans", sans-serif;
            
            @media (hover: hover) {
                :hover {
                    color: #acacac;
                }
            }
            :active {
                color: #3f3f3f;
            }

            @media (min-width: 768px) {
                color: #000000;
            }
        }

        .open-menu {
            display: flex;
        }

        @media (min-width: 768px) {
            flex-direction: row;
        }
    }
`;
