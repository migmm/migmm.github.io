import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Paragraph from "../../Styles/Paragraph/Paragraph";

import { apiURL } from "../../config/urls";
import { setupScrollHandler } from "./scrollHandler";

interface DataItem {
    name: string;
    jobTitle: string;
    location: string;
    githubURL: string;
    linkedinURL: string;
    email: string;
    whatsappNumber: string;
    telegramId: string;
    youtubeChannel: string;
    logo: string;
}

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataItem[]>([]);

    const contactIcons = useRef(null);
    const zoomElement = useRef(null);

    useEffect(() => {
        axios
            .get(`${apiURL}webconfig/`)
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
                console.log("Data fetched successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        if (!isLoading) {
            console.log("you are not on mobile");
            const cleanupScrollHandler = setupScrollHandler(contactIcons.current, zoomElement.current || zoomElement);
            
            return () => {
                cleanupScrollHandler();
            };
        }
    }, [isLoading]);

    return (
        <HomeContainer>
            {isLoading ? (
                <></>
            ) : (
                <>
                    <HeroContainer>
                        <TextContainer>
                            <TextHome ref={zoomElement}>
                                Hi everyone!
                                <br /> My name is {data.length > 0 ? data[0].name : ""}.
                                <br /> I'm a <span className="charge-text">{data.length > 0 ? data[0].jobTitle : ""}</span>,
                                <br /> from {data.length > 0 ? data[0].location : ""}.
                            </TextHome>
                        </TextContainer>
                        <ContactIcons ref={contactIcons}>
                            <a href={"data[0].githubURL"} target="_blank" rel="noreferrer">
                                <i className="fa-brands fa-github fa-3x"></i>
                            </a>
                            <a href={"data[0].linkedinURL"} target="_blank" rel="noreferrer">
                                <i className="fa-brands fa-linkedin fa-3x"></i>
                            </a>
                            <a href={"data[0].email"} target="_blank" rel="noreferrer">
                                <i className="fa fa-envelope fa-3x"></i>
                            </a>
                            <a href={"data[0].whatsappNumber"} target="_blank" rel="noreferrer">
                                <i className="fa-brands fa-whatsapp fa-3x"></i>
                            </a>
                            <a href={"data[0].telegramId"} target="_blank" rel="noreferrer">
                                <i className="fa-brands fa-telegram fa-3x"></i>
                            </a>
                        </ContactIcons>
                    </HeroContainer>
                    <ShortInfo>
                        <H2>About Me</H2>
                        <Paragraph
                            innerText="I have practical experience in languajes and technologies like Javascript/Typescript and Node.JS with 
                    MongoDB and PostgreSQL and a working knowledge of React. All of this combined with a creative and innovative mindset."
                        />
                        <Paragraph
                            innerText="With a flexible and goal-oriented approach, I can tackle complex challenges and develop innovative 
                    solutions, adapting to diverse project environments and requirements."
                        />
                    </ShortInfo>
                    <ProjectContaiener>
                        <H1> Latest Project</H1>

                        {/*                 <p>Featured projects that I've developed</p> */}

                        <CardsContainer>
                            <BigCardContainer>
                                <BigCard>
                                    <CardLeftPart>
                                        <CardImageContainer>
                                            <IMG src="img/cosmica-screens.png" alt="" />
                                        </CardImageContainer>
                                    </CardLeftPart>
                                    <CardRightPart>
                                        <CardTitleContainer>
                                            <H2>Juguetería Cósmica</H2>
                                        </CardTitleContainer>
                                        <CardInfoContainer>
                                            <Paragraph>
                                                e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and
                                                Javascript with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                            </Paragraph>
                                        </CardInfoContainer>
                                        <CardLanguagesContainer>
                                            <Bubble>React</Bubble>
                                            <Bubble>NodeJS</Bubble>
                                            <Bubble>MongoDB</Bubble>
                                        </CardLanguagesContainer>
                                    </CardRightPart>
                                </BigCard>
                            </BigCardContainer>
                        </CardsContainer>

                        <ViewMoreContainer>
                            <ViewMoreLink>View more projects</ViewMoreLink>
                        </ViewMoreContainer>
                    </ProjectContaiener>{" "}
                </>
            )}
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.nav`
    margin: 2em 0 2em 0;
`;

const HeroContainer = styled.div`
    width: 100%;
    height: calc(100vh - 130px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;

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

    h2 {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        text-align: center;
    }

    p {
        max-width: 900px;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.5em;
        }
    }
`;

const H1 = styled.h1`
    font-family: "Work Sans", sans-serif;
    font-weight: 800;
    text-align: center;
    margin: 2em 1em 0.5em 1em;
`;

const H2 = styled.h2`
    font-family: "Work Sans", sans-serif;
    font-weight: 700;
    color: white;
    //margin-top: 0.5em;
`;

const P = styled.p`
    font-family: "Work Sans", sans-serif;
    font-weight: 500;
    margin: 0.5em 0 0.5em 0;
    color: white;
`;

const Bubble = styled.span`
    font-family: "Work Sans", sans-serif;
    font-weight: 600;
    padding-right: 0.3em;
    border-radius: 22px;
    margin: 0.5em 0.2em 0 0;
    background-color: #ffffff;
    padding: 0.5em;
    border: 1px solid #ebebeb;
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
    //border: 1px solid black;
`;

const ViewMoreLink = styled.a`
    float: right;
    text-align: right;
    width: 100%;
    font-family: "Work Sans", sans-serif;
    font-weight: 500;
    margin: 0.5em 0 0.5em 0;
    text-decoration: none;
`;

const CardInfoContainer = styled.div`
`;

const ImageContainer = styled.div`
    width: 100%;
    border-radius: 30px;
`;

const IMG = styled.img`
    width: 100%;
`;

const CardLeftPart = styled.div`
`;

const BigCard= styled.div`
`;

const CardTitleContainer= styled.div`
`;

const CardImageContainer= styled.div`
`;

const CardRightPart = styled.div`
`;

const SmallCardsContainer = styled.div`
    width: 25%;
    height: 400px;
    background-color: red;
`;

const SmallCard = styled.div`
    margin: 1em;
    width: calc(100% - 2em);
    height: calc(50% - 1.5em);
    background-color: blue;
`;

const ProjectContaiener = styled.div`
`;
