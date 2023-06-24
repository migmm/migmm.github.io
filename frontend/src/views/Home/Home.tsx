import React, { useEffect } from "react";
import styled from "styled-components";
import { isMobile } from 'react-device-detect';

import Paragraph from "../../Styles/Paragraph/Paragraph";
import userDB from "../../dummy/userDB";

const Home = () => {
    
    useEffect(() => {

        if (!isMobile) {
            console.log("you are in mob")
        let url = window.location.pathname;
        url = url.slice(1, 1);

        const lockScroll = (option: string) => {
            console.log(url);
            if (option === "enabled") {
                document.body.style.overflow = "hidden";
                document.body.style.userSelect = "none";
            } else {
                document.body.style.overflow = "auto";
                document.body.style.userSelect = "auto";
            }
        };

        const zoomElement = document.querySelector(".text-home") as HTMLElement;
        const contactIcons = document.querySelector(".contact-icons") as HTMLElement;
        const OPACITY_STEP = 0.1;
        const ZOOM_SPEED = 0.2;
        let opacity = 1;
        let zoom = 1;

        function handleScroll(e: any) {
            if (window.pageYOffset <= 0) {
                lockScroll("enabled");
                zoomElement.style.display = `block`;
            }

            if (e.deltaY >= 0) {
                zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
                zoomElement.style.opacity = `${(opacity = opacity - OPACITY_STEP)}`;
                contactIcons.style.opacity = "0";
            } else {
                if (zoom + ZOOM_SPEED > 1.2) {
                    zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
                    zoomElement.style.opacity = `${(opacity = opacity + OPACITY_STEP)}`;
                    contactIcons.style.opacity = "1";
                }
            }

            if (opacity <= 0) {
                lockScroll("disabled");
                zoomElement.style.display = `none`;
            }
        }

        window.addEventListener("wheel", handleScroll);
        lockScroll("enabled");

        return () => {
            window.removeEventListener("wheel", handleScroll);
            lockScroll("disabled");
        };
}}, []);

    return (
        <HomeContainer>
            <div className="hero-container">
                <div className="text-container">
                    <p className="text-home">
                        Hi everyone!
                        <br /> My name is {userDB.name}.
                        <br /> I'm a <span className="charge-text">{userDB.jobTitle}</span>,
                        <br /> from {userDB.location}.
                    </p>
                </div>
                <div className="contact-icons">
                    <a href={userDB.githubURL} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github fa-3x"></i>
                    </a>
                    <a href={userDB.linkedinURL} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin fa-3x"></i>
                    </a>
                    <a href={userDB.email} target="_blank" rel="noreferrer">
                        <i className="fa fa-envelope fa-3x"></i>
                    </a>
                    <a href={userDB.whatsappNumber} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-whatsapp fa-3x"></i>
                    </a>
                    <a href={userDB.telegramId} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-telegram fa-3x"></i>
                    </a>
                    <a href={userDB.youtubeChannel} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-youtube fa-3x"></i>
                    </a>
                </div>
            </div>
            <div className="short-info">
                <Paragraph
                    innerText="I have practical experience in languajes and technologies like Javascript/Typescript and Node.JS with 
                    MongoDB and PostgreSQL and a working knowledge of React, combined with a creative and innovative mindset.
                    With a flexible and goal-oriented approach, I can tackle complex challenges and develop innovative 
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
        justify-content: center;
        background-color: #000000;
        color: #ffffff;
        padding: 5em 3em;

        p {
            max-width: 900px;
            text-align:center;
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
