import React from "react";
import styled from "styled-components";

const Projects = () => {
    return (
        <ProjectsStyles>
            <div className="projects-container">
                <h1>Projects</h1>
                <h2>latest project</h2>
                <div className="latest-project-container">
                    <div className="latest-project-image-container"></div>
                    <div className="latest-project-description"></div>
                </div>
                <div className="projects-tag-container">
                    <span>React</span>
                    <span>NodeJS</span>
                    <span>MongoDB</span>
                </div>
                <div className="projects-cards-container">
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h1 className="card-title">Project title</h1>
                        </div>
                        <div className="card-languages-container">
                            <span>React</span>
                            <span>NodeJS</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectsStyles>
    );
};

export default Projects;

const ProjectsStyles = styled.header`
    .projects-container {
        h1 {
            text-align: center;
        }

        h2 {
            text-align: center;
        }

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

        .projects-cards-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1em;
            justify-content: center;

            .projects-card {
                width: 200px;
                height: 250px;
                background-color: aquamarine;
                padding: 0.5em;
                .card-image-container {
                    width: 100%;
                    height: 100px;
                    background-color: aqua;
                }
                .card-title-container {
                    h1 {
                    }
                }

                .card-languages-container {
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
            }
        }
    }
`;
