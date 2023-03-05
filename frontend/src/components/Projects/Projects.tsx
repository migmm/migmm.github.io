import React from "react";
import styled from "styled-components";

const Projects = () => {
    return (
        <ProjectsStyles>
            <div className="projects-container">
                <h1>Projects</h1>
                {/*    <h2>latest project</h2>
                <div className="latest-project-container">
                    <div className="latest-project-image-container"></div>
                    <div className="latest-project-description"></div>
                </div>
                <div className="projects-tag-container">
                    <span>React</span>
                    <span>NodeJS</span>
                    <span>MongoDB</span>
                </div> */}
                <div className="projects-cards-container">
                    <div className="projects-card">
                        <div className="card-image-container"></div>
                        <div className="card-title-container">
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
                            <h2 className="card-title">Project title</h2>
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
    max-width: 1900px;
    margin: 0 auto;

    .projects-container {
        margin: 1em;

        h1 {
            font-family: "Work Sans", sans-serif;
            font-weight: 800;
            text-align: center;
            margin: 1em 1em 0.5em 1em;
        }

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
            display: grid;
            grid-template-columns: 1fr;
            gap: 1em;

            .projects-card {
                width: 100%;
                //height: 200px;
                margin-bottom: 2em;

                .card-image-container {
                    background-color: #0069c5;
                    height: 150px;
                    border-radius: 30px;
                }
                .card-title-container {
                    h2 {
                        font-family: "Work Sans", sans-serif;
                        font-weight: 700;
                        margin-top: .5em;
                    }
                }

                .card-languages-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;

                    span {
                        font-family: "Work Sans", sans-serif;
                        font-weight: 600;
                        padding-right: .3em ;
                        border-radius: 22px;
                        margin: .5em .2em 0 0;
                        background-color: #ffffff;
                        padding: .5em;
                        border: 1px solid #ebebeb;
                    }
                }
            }
        }
    }
`;
