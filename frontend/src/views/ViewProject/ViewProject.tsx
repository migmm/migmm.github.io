import React from "react";
import styled from "styled-components";
import FormattedView from "./FormattedView";

import H1 from "../../Styles/H1/H1";
import Paragraph from "../../Styles/Paragraph/Paragraph";

const ViewProject = () => {
    const content = "<h1>Titulo del Proyecto</h1><p>Contenido del proyecto...</p>";
    const title = "Project Title";
    const url = "Project URL";
    const status = "Project Status";

    return (
        <ViewProjectStyles>
            <div className="project-container">
                <H1>{title}</H1>
                <Paragraph>URL: <a href={url}>Link to project deploy</a></Paragraph>
                <Paragraph>Status: {status}</Paragraph>
                <FormattedView content={content} />
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
