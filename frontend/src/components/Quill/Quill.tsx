import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import {Resize, modules, formats} from './config'


const MAX_IMAGE_IN_QUILL_EDITOR = 10;

const QuillEditor = ({ placeholder, onChange }: any) => {
    const [editorHtml, setEditorHtml] = useState('');
    const [error, setError] = useState('');

    const handleChange = (html: any) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const images = tempDiv.getElementsByTagName('img');

        if (images.length > MAX_IMAGE_IN_QUILL_EDITOR) {
            setError(`Exceeded the maximum image count. You can only add ${MAX_IMAGE_IN_QUILL_EDITOR} images.`);
            return;
        }

        setEditorHtml(html);
        onChange(html);
    };

    return (
        <QuillEditorContainer>
            <ReactQuill
                onChange={handleChange}
                value={editorHtml}
                modules={modules}
                formats={formats}
                bounds='.app'
                placeholder={placeholder}
                style={editorStyle}
            />
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </QuillEditorContainer>
    );
};

export default QuillEditor;

const QuillEditorContainer = styled.div`
    width: 100%;
    margin: 0 auto;

    .ql-picker.ql-font {
        .ql-picker-item {
            font-size: 0;
            &:before {
                content: attr(data-value) !important;
                font-size: 14px;
            }
        }
    }

    .ql-picker.ql-font {
        .ql-active {
            &:before {
                content: attr(data-value) !important;
                font-size: 14px;
            }
        }
    }

    .ql-picker.ql-font .ql-picker-label[data-value='Work-Sans']::before,
    .ql-picker.ql-font .ql-picker-item[data-value='Work-Sans']::before {
        font-family: 'Work Sans', cursive;
        content: 'Work Sans' !important;
    }

    .ql-font-Work-Sans {
        font-family: 'Work Sans';
    }

    .ql-toolbar {
        border:none;
    }

    .ql-container {
        position: relative;
        height: 400px;
        border:none;
    }

    .ql-container .ql-editor {
        height: 100%;
        overflow-y: auto;
    }
`;

const editorStyle: React.CSSProperties = {
    height: '400px',
    width: '100%',
    resize: 'vertical' as Resize,
    overflow: 'auto',
    borderRadius: '20px',
    border: '1px solid #EBEBEB',
    backgroundColor: '#fff',
    overflowX: 'auto',
    overflowY: 'hidden',
};

const ErrorLabel = styled.div`
    color: #ff0000;
    margin-top: 5px;
`;
