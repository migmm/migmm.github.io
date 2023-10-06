import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { isMobile } from "react-device-detect";

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
    useEffect(() => {
        if (!isMobile) {
            console.log("you are in mobile");
            setupScrollHandler();
        }
    }, []);

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        axios
            .get(`${apiURL}webconfig/`)
            .then((response) => {

                setData(data);
                console.log("Data fetched successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <HomeContainer>
            <div className="hero-container">
                <div className="text-container">
                    <p className="text-home">
                        Hi everyone!
                        <br /> My name is {data[0].name}.
                        <br /> I'm a <span className="charge-text">{data[0].jobTitle}</span>,
                        <br /> from {data[0].location}.
                    </p>
                </div>
                <div className="contact-icons">
                    <a href={data[0].githubURL} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github fa-3x"></i>
                    </a>
                    <a href={data[0].linkedinURL} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin fa-3x"></i>
                    </a>
                    <a href={data[0].email} target="_blank" rel="noreferrer">
                        <i className="fa fa-envelope fa-3x"></i>
                    </a>
                    <a href={data[0].whatsappNumber} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-whatsapp fa-3x"></i>
                    </a>
                    <a href={data[0].telegramId} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-telegram fa-3x"></i>
                    </a>
                </div>
            </div>
            <div className="short-info">
                <h2>About Me</h2>
                <Paragraph
                    innerText="I have practical experience in languajes and technologies like Javascript/Typescript and Node.JS with 
                    MongoDB and PostgreSQL and a working knowledge of React. All of this combined with a creative and innovative mindset."
                />
                <Paragraph
                    innerText="With a flexible and goal-oriented approach, I can tackle complex challenges and develop innovative 
                    solutions, adapting to diverse project environments and requirements."
                />
            </div>
            <div className="projects-container">
                <h1> Latest Project</h1>

                {/*                 <p>Featured projects that I've developed</p> */}

                <div className="cards-container">
                    <div className="big-card-container">
                        <div className="big-card">
                            <div className="card-left-part">
                                <div className="card-image-container">
                                    <img src="img/cosmica-screens.png" alt="" />
                                </div>
                            </div>
                            <div className="card-right-part">
                                <div className="card-title-container">
                                    <h2 className="card-title">Juguetería Cósmica</h2>
                                </div>
                                <div className="info-container">
                                    <Paragraph>
                                        e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and
                                        Javascript with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                    </Paragraph>
                                </div>
                                <div className="card-languages-container">
                                    <span>React</span>
                                    <span>NodeJS</span>
                                    <span>MongoDB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="view-more-container">
                    <a href="#" className="view-more-link">
                        View more projects
                    </a>
                </div>
            </div>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.nav`
    margin: 2em 0 2em 0;

    .hero-container {
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

        .text-container {
            max-width: 1600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 1em;
            padding-bottom: 3em;

            .text-home {
                text-align: center;
                font-size: 6vw;
                font-family: "Work Sans", sans-serif;
                font-weight: 800;
                //word-spacing: -10px;
                opacity: 1;
                transition: transform 330ms ease-in-out, opacity 0.2s ease;
            }
        }

        .contact-icons {
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
        }
    }

    .short-info {
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
    }

    .projects-container {
        //background-color: #000000;
        h1 {
            font-family: "Work Sans", sans-serif;
            font-weight: 800;
            text-align: center;
            margin: 2em 1em 0.5em 1em;
        }

        .cards-container {
            padding: 1em;
            display: flex;
            justify-content: center;
            gap: 1em;

            .big-card-container {
                width: 65%;

                .card-left-part {
                    /*  @media (min-width: 768px) {
                        width: 40%;
                    } */

                    .card-image-container {
                        //background-color: #0069c5;
                        width: 100%;
                        border-radius: 30px;

                        img {
                            width: 100%;
                        }
                    }
                }

                .card-right-part {
                    /*     @media (min-width: 768px) {
                        width: 40%;
                    } */

                    .card-title-container {
                        h2 {
                            font-family: "Work Sans", sans-serif;
                            font-weight: 700;
                            color: white;
                            //margin-top: 0.5em;
                        }
                    }

                    .info-container {
                        p {
                            font-family: "Work Sans", sans-serif;
                            font-weight: 500;
                            margin: 0.5em 0 0.5em 0;
                            color: white;
                        }
                    }
                    .card-languages-container {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;

                        span {
                            font-family: "Work Sans", sans-serif;
                            font-weight: 600;
                            padding-right: 0.3em;
                            border-radius: 22px;
                            margin: 0.5em 0.2em 0 0;
                            background-color: #ffffff;
                            padding: 0.5em;
                            border: 1px solid #ebebeb;
                        }
                    }
                }
            }
            .small-cards-container {
                width: 25%;
                height: 400px;
                background-color: red;

                .small-card {
                    margin: 1em;
                    width: calc(100% - 2em);
                    height: calc(50% - 1.5em);
                    background-color: blue;
                }
            }
        }

        .view-more-container {
            width: 100%;
            //border: 1px solid black;

            .view-more-link {
                float: right;
                text-align: right;
                width: 100%;
                font-family: "Work Sans", sans-serif;
                font-weight: 500;
                margin: 0.5em 0 0.5em 0;
                text-decoration: none;
            }
        }
    }
`;
