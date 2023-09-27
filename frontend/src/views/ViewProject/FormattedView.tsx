import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const FormattedView = ({ content }: any) => {
    return (
        <StyledContent>
            <ReactQuill value={content} readOnly={true} theme='snow' />
        </StyledContent>
    );
};

export default FormattedView;

const StyledContent = styled.div`
    // Styles for the main container
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    padding: 1em;
    overflow: auto;
    box-shadow: none; // Removes the shadow
    border: none; // Removes the border
    margin: 3em 0 4em 0;

    // Styles for the editor content
    .ql-editor {
        // Text styles
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
            background-color: #f3f3f3;
            padding: 2px 4px;
            border-radius: 4px;
        }

        // Text alignment styles
        .ql-align-center {
            text-align: center;
        }

        .ql-align-right {
            text-align: right;
        }

        .ql-align-justify {
            text-align: justify;
        }
        .ql-font-Work-Sans {
            font-family: 'Work Sans';
        }

        h1,
        h2,
        p {
            font-family: 'Work Sans';
        }

        img {
            border-radius: 10px;
        }
    }

    // Styles to hide the toolbar
    .ql-toolbar {
        display: none;
    }

    .ql-container.ql-snow {
        border: none !important;
    }
`;
