import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

type Resize = 'none' | 'both' | 'horizontal' | 'vertical' | 'initial' | 'inherit';

const MAX_IMAGE_IN_QUILL_EDITOR = 10;

const Font = ReactQuill.Quill.import('formats/font');
Font.whitelist = ['Work-Sans'];
ReactQuill.Quill.register(Font, true);

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

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ font: Font.whitelist }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'align',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code',
    ];

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
    border: '1px solid #CCCCCC',
    backgroundColor: '#fff',
    overflowX: 'auto',
    overflowY: 'hidden',
};

const ErrorLabel = styled.div`
    color: #ff0000;
    margin-top: 5px;
`;
