import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = ({ homeData }: any) => {
    const data = homeData[0];

    return (
        <FooterStyles>
            <div className='footer-content'>
                <div className='first-column'>
                    <div className='items-container'>
                        <div className='img-container'>
                            <Link to='/'>
                                <img src={data.logo} alt='Logo' />
                            </Link>
                        </div>
                        <div className='p-container'>
                            <Link to='/'>
                                <h2>miguedev</h2>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='second-column'>
                    <h3>Sections</h3>
                    <ul className='link-list'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/certificates'>Certificates</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className='third-column'>
                    <h3>Get in touch</h3>
                    <p className='footer-text'>
                        Feel free to reach out to me by sending a message, and I will make sure to reply as soon as possible.
                    </p>
                    <Link to='/contact'>
                        <button className='footer-button'>Contact me!</button>
                    </Link>

                    <div className='footer-icons'>
                        <a href={data.githubURL} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-github fa-2x'></i>
                        </a>
                        <a href={data.linkedinURL} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-linkedin fa-2x'></i>
                        </a>
                        <a href={`mailto:${data.email}`} target='_blank' rel='noreferrer'>
                            <i className='fa fa-envelope fa-2x'></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${data.whatsappNumber}`} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-whatsapp fa-2x'></i>
                        </a>
                        <a href={`https://t.me/${data.telegramId}`} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-telegram fa-2x'></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className='footer-copyright'>
                <p className='copyright-text'>
                    {' '}
                    ©{new Date().getFullYear()} <Link to='/'>miguedev</Link> | All rights reserved.
                </p>
                <div className='hidden-link-container'>
                    <Link to='/login'>π</Link>
                </div>
            </div>
        </FooterStyles>
    );
};

export default Footer;
const FooterStyles = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2em;
    //margin-top: 10em;

    width: 100%;
    background-color: #1c1d1f;
    font-family: 'Work Sans', sans-serif;
    color: #f3f3f1;

    .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media (min-width: 768px) {
            flex-direction: row;
            align-items: unset;
            justify-content: unset;
            margin: 0 4em 0 4em;
        }

        .first-column {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-family: 'Work Sans', sans-serif;
            margin: 1em;

            @media (min-width: 768px) {
                width: 30%;
                align-items: start;
            }

            .items-container {
                display: flex;
                flex-direction: row;
                align-items: center;

                .img-container {
                    img {
                        width: 65px;
                        height: 65px;
                    }
                }

                .p-container {
                    a {
                        text-decoration: none;
                        color: #f3f3f1;

                        :hover {
                            color: #696969;
                        }

                        :active {
                            color: #9e9e9e;
                        }
                    }
                }
            }
        }

        .second-column {
            font-family: 'Work Sans', sans-serif;
            color: #f3f3f1;
            margin: 1.7em;

            @media (min-width: 768px) {
                width: 30%;
            }

            a {
                text-decoration: none;

                :visited {
                    color: #f3f3f1;
                }
            }

            .link-list {
                list-style: none;
                padding: 0;
                margin-top: 1em;

                li {
                    margin-bottom: 0.5em;

                    a {
                        text-decoration: none;
                        color: #f3f3f1;

                        :hover {
                            color: #696969;
                        }

                        :active {
                            color: #9e9e9e;
                        }
                    }
                }
            }
        }

        .third-column {
            margin: 1.7em 1.7em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .footer-text {
                margin: 1em 1em 1em 0;
                text-align: center;
            }

            @media (min-width: 768px) {
                width: 30%;
                align-items: unset;
                justify-content: unset;
                .footer-text {
                    text-align: left;
                }
            }

            .footer-button {
                background-color: #ed1b23;
                height: 65px;
                font-family: 'Work Sans', sans-serif;
                color: #f3f3f1;
                font-weight: 500;
                line-height: 65px;
                font-size: 1em;
                padding: 0 1em;
                border-radius: 20px;
                border: none;
                margin-right: 1em;
                cursor: pointer;
                margin: 1em 1em 2em 0;

                @media (hover: hover) {
                    :hover {
                        background-color: #ce030a;
                    }
                }

                :active {
                    background-color: #ff0000;
                }
            }

            .footer-icons {
                display: flex;
                flex-direction: row;
                justify-content: center;

                @media (min-width: 768px) {
                    justify-content: start;
                }

                a {
                    color: #f3f3f1;
                    margin: 1em 1em 0 1em;

                    @media (min-width: 768px) {
                        margin: 1em 1em 0 0;
                    }

                    :hover {
                        color: #696969;
                    }

                    :active {
                        color: #9e9e9e;
                    }
                }
            }
        }
    }
    .footer-copyright {
        background-color: #000000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;

        .hidden-link-container {
            position: absolute;
            right: 0;

            a {
                color: #000000;
                text-decoration: none;

                :hover {
                    color: #000000;
                }
            }
        }

        .copyright-text {
            font-size: 0.8em;
            padding: 1.5em;

            a {
                color: #f3f3f1;
                text-decoration: none;

                :hover {
                    color: #696969;
                }

                :active {
                    color: #9e9e9e;
                }
            }
        }
    }
`;
