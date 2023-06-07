import React from "react";
import styled from "styled-components";
import H1 from "../../Styles/H1/H1"
import Paragraph from "../../Styles/Paragraph/Paragraph"

const Projects = () => {
    return (
        <ProjectsStyles>
            <div className="projects-container">
                <H1>Projects</H1>

                <div className="projects-cards-container">

                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>

                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>


                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>


                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>


                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>


                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
                                </Paragraph>
                            </div>
                            <div className="card-languages-container">
                                <span>React</span>
                                <span>NodeJS</span>
                                <span>MongoDB</span>
                            </div>
                        </div>
                    </div>

                    <div className="projects-card">
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
                                    e-commerce project using several technologies and design patterns. I the frontend I used HTML, CSS and Javascript
                                    with Handlebars. In the backend I used Node.js, Express and MongoDB.
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
        </ProjectsStyles>
    );
};

export default Projects;

const ProjectsStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

    @media (min-width: 768px) {
        max-width: 1200px;
    }

    .projects-container {
        margin: 1em;

        /*   h2 {
            text-align: center;
        } */
        /* 
        .latest-project-container {
            display: flex;
            flex-direction: row;
            gap: 1em;

            .latest-project-image-container {
                width: 50%;
                height: 400px;
                background-color: aliceblue;
            }
            .latest-project-description {
                width: 50%;
                height: 400px;
                background-color: antiquewhite;
            }
        }

        .projects-tag-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            span {
                background-color: beige;
                padding: 0.3em;
                border-radius: 30%;
                margin: 0.2em;
            }
        }
 */
        .projects-cards-container {
            display: flex;
            flex-direction: column;
            gap: 1em;

            .projects-card:nth-child(odd) {

                @media (min-width: 768px) {
                    grid-column-start: 2;
                    /* grid-auto-flow: column;  */
                    direction: rtl; 
                }
            }

            .projects-card {
                width: 100%;
                //height: 200px;
                margin: 1em 0 2em 0;
                //background-color: red;
                //height: 200px;

                @media (min-width: 768px) {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2em;
                }

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
        }
    }
`;
