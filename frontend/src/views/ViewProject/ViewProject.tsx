import React from "react";
import styled from "styled-components";
import FormattedView from "./FormattedView";

import H1 from "../../Styles/H1/H1";
import Paragraph from "../../Styles/Paragraph/Paragraph";

const ViewProject = () => {
    const sampleobject = {
        coverImage: "coverImage.jpg",
        showInLandPage: false,
        projectName: "Project 1",
        projectStatus: "finished",
        gitURL: "http://www.github.com/project1",
        deployURL: "http://www.project1.com",
        shortDescription: "Test project of how document shows",
        editorHtml:
            '<h1 class="ql-align-center"><span class="ql-font-Work-Sans">Test project</span></h1><p><br></p><p>Test project of how document shows with images.</p><p><br></p>',
    };

    return (
        <ViewProjectStyles>
            <div className="project-container">
                <H1>Project Name: {sampleobject.projectName}</H1>

                <Paragraph>Project Status: {sampleobject.projectStatus}</Paragraph>
                <Paragraph>
                    Git URL: <a href={sampleobject.gitURL}>{sampleobject.gitURL}</a>
                </Paragraph>
                <Paragraph>
                    Deploy URL: <a href={sampleobject.deployURL}>{sampleobject.deployURL}</a>
                </Paragraph>
                <Paragraph>Short Description: {sampleobject.shortDescription}</Paragraph>
                <FormattedView content={sampleobject.editorHtml} />
            </div>
        </ViewProjectStyles>
    );
};

export default ViewProject;

const ViewProjectStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

    .project-container {
        margin: 1em;
        background-color: white;
        border-radius: 4px;
    }
`;
