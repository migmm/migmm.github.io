import React from 'react';
import styled from 'styled-components';

const FormattedView = ({ content }: any) => {
    return <StyledContent dangerouslySetInnerHTML={{ __html: content }} />;
};

export default FormattedView;

const StyledContent = styled.div`
    background-color: #fff;
    font-family: "Work Sans", sans-serif;
    width: 100%;
    border-radius: 10px;
    padding: 1em;
    overflow: auto;
    box-shadow: none;
    border: none;
    margin: 3em 0 4em 0;

    h1 {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        font-size: 2.5em;
        margin-bottom: 0.5em;
    }

    h2 {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        font-size: 1.8em;
        margin-bottom: 0.5em;
    }

    h3 {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        font-size: 1.4em;
        margin-bottom: 0.5em;
    }

    h4 {
        font-family: "Work Sans", sans-serif;
        font-weight: 500;
        font-size: 1.4em;
        margin-bottom: 0.5em;
    }

    h5 {
        font-family: "Work Sans", sans-serif;
        font-weight: 500;
        font-size: 1.4em;
        margin-bottom: 0.5em;
    }

    p {
        font-family: "Work Sans", sans-serif;
        font-weight: 500;
        font-size: 1.2em;
        margin-bottom: 0.5em;
    }

    ul,
    ol {
        margin-bottom: 1em;
        padding-left: 1em;
        text-align: left;
    }

    li {
        margin-bottom: 0.5em;
        text-align: left;
    }

    blockquote {
        margin-bottom: 1em;
        padding-left: 1em;
        border-left: 4px solid #ccc;
        text-align: left;
    }

    a {
        color: #0366d6;
        text-decoration: underline;
    }

    strong {
        font-weight: bold;
    }

    em {
        font-style: italic;
    }

    u {
        text-decoration: underline;
    }

    del {
        text-decoration: line-through;
    }

    code {
        font-family: monospace;
        color: #f3f3f3;
        background-color: #161B22;
        font-size: 1em;
    }

    img {
        border-radius: 10px;
    }

    pre {
        background-color: #161B22;
        border-radius: 10px;
        padding: 1em;
        margin: 20px 0 20px 0;
    }

    table {
        margin: 1em 0 1em 0;
    }
`;
