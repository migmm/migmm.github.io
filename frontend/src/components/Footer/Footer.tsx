import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Footer = ({ homeData }: any) => {
    const data = homeData[0];

    return (
        <FooterContainer>
            <FooterContent>
                <FirstColumn>
                    <ItemsContainer>
                        <ImgContainer>
                            <Link to='/'>
                                <img src={data.logo} alt='Logo' />
                            </Link>
                        </ImgContainer>
                        <PContainer>
                            <Link to='/'>
                                <h2>miguedev</h2>
                            </Link>
                        </PContainer>
                    </ItemsContainer>
                </FirstColumn>
                <SecondColumn>
                    <h3>Sections</h3>
                    <LinkList>
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
                    </LinkList>
                </SecondColumn>
                <ThirdColumn>
                    <h3>Get in touch</h3>
                    <p className='footer-text'>
                        Feel free to reach out to me by sending a message, and I will make sure to reply as soon as possible.
                    </p>
                    <Link to='/contact'>
                        <FooterButton>Contact me!</FooterButton>
                    </Link>
                    <FooterIcons>
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
                    </FooterIcons>
                </ThirdColumn>
            </FooterContent>
            <FooterCopyright>
                <CopyrightText>
                    {' '}
                    ©{new Date().getFullYear()} <Link to='/'>miguedev</Link> | All rights reserved.
                </CopyrightText>
                <HiddenLinkContainer>
                    <Link to='/login'>π</Link>
                </HiddenLinkContainer>
            </FooterCopyright>
        </FooterContainer>
    );
};

export default Footer;


const FooterContainer = styled.footer`
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
`;

const FooterContent = styled.div`
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
`;

const FirstColumn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Work Sans', sans-serif;
    margin: 1em;

    @media (min-width: 768px) {
        width: 30%;
        align-items: start;
    }
`;

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ImgContainer = styled.div`
    img {
        width: 65px;
        height: 65px;
    }
`;

const PContainer = styled.div`
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
`;

const SecondColumn = styled.div`
    font-family: 'Work Sans', sans-serif;
    color: #f3f3f1;
    margin: 1.7em;

    @media (min-width: 768px) {
        width: 30%;
    }
`;

const LinkList = styled.ul`
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
`;

const ThirdColumn = styled.div`
    margin: 1.7em 1.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        width: 30%;
        align-items: unset;
        justify-content: unset;

        .footer-text {
            text-align: left;
        }
    }
`;

const FooterButton = styled.button`
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
`;

const FooterIcons = styled.div`
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
`;

const FooterCopyright = styled.div`
    background-color: #000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
`;

const HiddenLinkContainer = styled.div`
    position: absolute;
    right: 0;

    a {
        color: #000000;
        text-decoration: none;

        :hover {
            color: #000000;
        }
    }
`;

const CopyrightText = styled.div`
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
`;