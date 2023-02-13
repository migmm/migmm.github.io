import React from "react";
import styled from "styled-components";

import logoGithub from "./github.svg"; 
import logoTelegram from "./telegram.svg";
import logoWhatsapp from "./whatsapp.svg";
import logoEmail from "./email.svg";
import logoLinkedin from "./linkedin.svg";

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

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
                <h1>Projects</h1>

                <p>Featured projects that I've developed</p>

                <div className="cards-container">
                    <div className="big-card-container">
                        <div className="big-card"></div>
                    </div>
                    <div className="small-cards-container">
                        <div className="small-card"></div>
                        <div className="small-card"></div>
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
    .hero-container {
        width: 100%;
        height: calc(100vh - 65px);
        border: 1px solid red;

        .text-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid red;
            height: 50%;

            .text-home {
                text-align: center;
                font-size: 5vw;

                .charge-text {
                }
            }
        }

        .contact-icons {
            width: 100%;
            height: 50%;
            display: flex;
            flex: row;
            justify-content: center;
            align-items: center;

            a {
                color: red;
            }
        }
    }

    .projects-container {
        .cards-container {
            .big-card-container {
            }
            .small-cards-container {
            }
        }
        .view-more-container {
            .view-more-link {
                /*  a */
            }
        }
    }
`;
