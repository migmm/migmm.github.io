import React from "react";
import styled from "styled-components";

import logoGithub from "./github.svg";
import logoTelegram from "./telegram.svg";
import logoWhatsapp from "./whatsapp.svg";
import logoEmail from "./email.svg";
import logoLinkedin from "./linkedin.svg";

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
            

            .text-home {
                text-align: center;
                font-size: 5vw;
                font-family: 'Work Sans', sans-serif;
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
                img {
                    width: 50px;
                    height: 50px;
                    color: red;
                }
            }
        }
    }

    .projects-container {

     
        h1 {
            text-align: center;
            margin: 1em;
            font-family: Arial, Helvetica, sans-serif;
        }

        p {
            text-align: center;
            margin: 1em;
            font-family: Arial, Helvetica, sans-serif;
        }

        .cards-container {
            padding: 1em;
            display: flex;
            justify-content: center;
            gap: 1em;

            .big-card-container {
                width: 65%;
                background-color: red;
                height: 400px;

                .big-card {
                    margin: 1em;
                    width: calc(100% - 2em);
                    height: calc(100% - 2em);
                    background-color: blue;
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
            border: 1px solid black;

            .view-more-link {
                float: right;
                text-align: right;
                width: 100%;
            }
        }
    }
`;
