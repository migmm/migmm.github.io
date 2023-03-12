import React from "react";
import styled from "styled-components";

import logoGithub from "./github.svg";
import logoTelegram from "./telegram.svg";
import logoWhatsapp from "./whatsapp.svg";
import logoEmail from "./email.svg";
import logoLinkedin from "./linkedin.svg";

import{ Paragraph } from "../../Styles/Paragraph/Paragraph"

const Home = () => {
    return (
        <HomeContainer>
            <div className="hero-container">
                <div className="text-container">
                    <p className="text-home">
                        Hi everyone!
                        <br /> My name is Miguel.
                        <br /> I'm a <span className="charge-text">FullStack Engineer</span>,
                        <br /> from Argentina.
                    </p>
                </div>
                <div className="contact-icons">
                    <a href="https://github.com/migmm" target="_blank">
                        <img src={logoGithub} alt="" />
                    </a>
                    <a href="https://www.linkedin.com/in/miguelmiche/" target="_blank">
                        <img src={logoLinkedin} alt="" />
                    </a>
                    <a href="mailto:hi@miguedev.com" target="_blank">
                        <img src={logoEmail} alt="" />
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5492914144624" target="_blank">
                        <img src={logoWhatsapp} alt="" />
                    </a>
                    <a href="https://t.me/micmig" target="_blank">
                        <img src={logoTelegram} alt="" />
                    </a>
                </div>
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
        // height: calc(100% - 65px);
        //border: 1px solid red;

        .text-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            //border: 1px solid blue;
            padding-top: 1em;
            padding-bottom: 3em;

            .text-home {
                text-align: center;
                font-size: 7vw;
                font-family: "Work Sans", sans-serif;
                font-weight: 800;
                //word-spacing: -10px;

                .charge-text {
                }
            }
        }

        .contact-icons {
            width: 100%;
            height: 40%;
            display: flex;
            flex: row;
            justify-content: center;
            align-items: center;

            a {
                fill: green !important;

                img {
                    width: 8vh;
                    //height: 40px;
                    fill: green !important;
                    margin: 0 0.5em;
                }

                :hover {
                    fill: green !important;
                }
            }
        }
    }

    .projects-container {
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
                            //margin-top: 0.5em;
                        }
                    }

                    .info-container {
                        p {
                            font-family: "Work Sans", sans-serif;
                            font-weight: 500;
                            margin: 0.5em 0 0.5em 0;
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
