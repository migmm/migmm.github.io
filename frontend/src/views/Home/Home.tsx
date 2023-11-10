import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

import Paragraph from "../../Styles/Paragraph/Paragraph";
import { setupScrollHandler } from "./scrollHandler";
import Balloon from "../../components/Balloon/Balloon";

import htmlLogo from "../../assets/icons/html5.svg";
import cssLogo from "../../assets/icons/css3.svg";
import javascriptLogo from "../../assets/icons/javascript.svg";
import typescriptLogo from "../../assets/icons/typescript.svg";
import reactLogo from "../../assets/icons/react.svg";
import nodeLogo from "../../assets/icons/nodejs.svg";
import expressLogo from "../../assets/icons/express.svg";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/springboot.svg";
import mongoLogo from "../../assets/icons/mongodb.svg";
import mysqlLogo from "../../assets/icons/mysql.svg";
import postgresLogo from "../../assets/icons/postgresql.svg";
import phpLogo from "../../assets/icons/php.svg";


const Home = ({ homeData }: any) => {
    const contactIcons = useRef(null);
    const zoomElement = useRef(null);
    const heroContainerFixed = useRef(null);

    const data = homeData[0];

    useEffect(() => {
        if (!isMobile) {
            console.log("you are not on mobile");
            const cleanupScrollHandler = setupScrollHandler(contactIcons.current, zoomElement.current || zoomElement, heroContainerFixed.current);
            return () => {
                cleanupScrollHandler();
            };
        }
    }, []);

    return (
        <HomeContainer>
            <HeroHeightReserver>
                <HeroContainer ref={heroContainerFixed}>
                    <TextContainer>
                        <TextHome ref={zoomElement}>
                            Hi everyone!
                            <br /> My name is {data.name}.
                            <br /> I'm a <span className="charge-text">{data.jobTitle}</span>,
                            <br /> from {data.location}.
                        </TextHome>
                    </TextContainer>
                    <ContactIcons ref={contactIcons}>
                        <a href={data.githubURL} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github fa-3x"></i>
                        </a>
                        <a href={data.linkedinURL} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-linkedin fa-3x"></i>
                        </a>
                        <a href={`mailto:${data.email}`} target="_blank" rel="noreferrer">
                            <i className="fa fa-envelope fa-3x"></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${data.whatsappNumber}`} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-whatsapp fa-3x"></i>
                        </a>
                        <a href={`https://t.me/${data.telegramId}`} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-telegram fa-3x"></i>
                        </a>
                    </ContactIcons>
                </HeroContainer>
            </HeroHeightReserver>
            <ShortInfo>
                <H2>About Me</H2>
                <Paragraph
                    innerText="I have practical experience in languajes and technologies like PHP, JAVA, Javascript/Typescript and Node.JS with 
                    MongoDB and PostgreSQL and a working knowledge of React. All of this combined with a creative and innovative mindset."
                />
                <Paragraph
                    innerText="With a flexible and goal-oriented approach, I can tackle complex challenges and develop innovative 
                    solutions, adapting to diverse project environments and requirements."
                />
            </ShortInfo>
            <Skills>
                <H2>My weapon of choice</H2>
                <IMGContainer>
                    <img src={htmlLogo} alt="HTML logo" />
                    <img src={cssLogo} alt="CSS logo" />
                    <img src={javascriptLogo} alt="Javascript logo" />
                    <img src={typescriptLogo} alt="Typescript logo" />
                    <img src={reactLogo} alt="ReactJS logo" />
                    <img src={nodeLogo} alt="NodeJS logo" />
                    <img src={expressLogo} alt="Express logo" />
                    <img src={javaLogo} alt="JAVA logo" />
                    <img src={springLogo} alt="SpringBoot logo" />
                    <img src={phpLogo} alt="PHP logo" />
                    <img src={mongoLogo} alt="MongoDB logo" />
                    <img src={mysqlLogo} alt="MySQL logo" />
                    <img src={postgresLogo} alt="PostgreSQL logo" />
                </IMGContainer>
            </Skills>
            <ProjectContaiener>
                <H2> Featured project</H2>

                {/*                 <p>Featured projects that I've developed</p> */}

                <CardsContainer>
                    <BigCardContainer>
                        <BigCard>
                            <CardLeftPart>
                                <CardImageContainer>
                                <Link to="/viewproject/6516025d1b4919237b91f9af">
                                    <IMG src="img/cosmica-screens.png" alt="Project preview" />
                                </Link>
                                </CardImageContainer>
                            </CardLeftPart>
                            <CardRightPart>
                                <CardTitleContainer>
                                    <H2>Juguetería Cósmica</H2>
                                </CardTitleContainer>
                                <CardInfoContainer>
                                    <Paragraph innerText='E-commerce project using several technologies and design patterns. In the frontend I used HTML, CSS and
                                        Javascript and in the backend I used Node.js, Express and MongoDB.'/>
                                </CardInfoContainer>
                                <CardLanguagesContainer>
                                    <Link to="/search/">
                                        <Balloon innerText='HTML'/>
                                    </Link>
                                    <Link to="/search/">
                                        <Balloon innerText='CSS'/>
                                    </Link>
                                    <Link to="/search/">
                                        <Balloon innerText='Javascrip'/>
                                    </Link>
                                    <Link to="/search/">
                                        <Balloon innerText='NodeJS'/>
                                    </Link>
                                    <Link to="/search/">
                                        <Balloon innerText='MongoDB'/>
                                    </Link>
                                </CardLanguagesContainer>
                            </CardRightPart>
                        </BigCard>
                    </BigCardContainer>
                </CardsContainer>

                <ViewMoreContainer>
                    <Link to="/projects">View more projects</Link>
                </ViewMoreContainer>
            </ProjectContaiener>{" "}
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.main`
    margin: 0 0 0 0;
`;

const HeroHeightReserver = styled.div`
    height: 90vh;
`;

const HeroContainer = styled.div`
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        justify-content: center;
        margin-top: unset;
    }
`;

const TextContainer = styled.div`
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1em;
    padding-bottom: 3em;
    margin: 0 auto;
`;

const TextHome = styled.p`
    text-align: center;
    font-size: 6vw;
    font-family: "Work Sans", sans-serif;
    display: block;
    font-weight: 800;
    //word-spacing: -10px;
    opacity: 1;
    transition: transform 330ms ease-in-out, opacity 0.2s ease;
`;

const ContactIcons = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex: row;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s;

    @media (min-width: 900px) {
        .fa-3x {
            font-size: 4.5em;
        }
    }

    a {
        width: 50px;
        height: 50px;
        color: black;
        margin: 0.2em;

        @media (min-width: 900px) {
            margin: 1.5em;
        }

        @media (hover: hover) {
            :hover {
                color: #ed1b23;
            }
        }

        :active {
            color: #ff0000;
        }
    }
`;

const ShortInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #000000;
    padding: 5em 3em;

    p {
        max-width: 900px;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.5em;
        }
    }
`;

const Skills = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #000000;
    padding: 5em 3em;

    p {
        max-width: 900px;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.5em;
        }
    }
`;

const IMGContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    margin-top: 2em;
    max-width: 1200px;

    img {
        width: 200px;
    }
`;

const H2 = styled.h2`
    font-family: "Work Sans", sans-serif;
    font-weight: 800;
    font-size: 2em;
    color: black;
    margin-bottom: 1em;
    width:100%;
    text-align: center;
    //margin-top: 0.5em;
`;

const CardsContainer = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    gap: 1em;
`;

const BigCardContainer = styled.div`
    width: 65%;
`;

const CardLanguagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ViewMoreContainer = styled.div`
    width: 100%;
    float: right;
    text-align: right;
    width: 100%;
    font-family: "Work Sans", sans-serif;
    font-weight: 500;
    margin: 0.5em 0 0.5em 0;

    a {    
        color: black;
        text-decoration: none;
        
        :hover {
            color: #b6b4b4;
        }
    }
    

`;

const CardInfoContainer = styled.div`
`;

const IMG = styled.img`
    width: 100%;
`;

const CardLeftPart = styled.div`
`;

const BigCard = styled.div`
`;

const CardTitleContainer = styled.div`
`;

const CardImageContainer = styled.div`
`;

const CardRightPart = styled.div`
`;

const ProjectContaiener = styled.div`
    padding: 5em 3em;
    padding-bottom: 10em;
    align-items: center;
    background-color: #ffffff;
`;
