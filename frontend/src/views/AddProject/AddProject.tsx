import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import './Editor.css';
type Resize = "none" | "both" | "horizontal" | "vertical" | "initial" | "inherit";

const Editor = ({ placeholder }: any) => {
    const [editorHtml, setEditorHtml] = useState("");

    const handleChange = (html: any) => {
        setEditorHtml(html);
    };

    const editorContainerStyle: React.CSSProperties = {
        height: "400px",
        maxWidth: '1050px',
        resize: "vertical" as Resize,
        overflow: "auto",
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
            ["clean"],
            ["code"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "align",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code",
    ];

    return (
        <div>
            <div style={{ backgroundColor: 'white',  maxWidth: '1050px', borderRadius: '10px' }}>
                <ReactQuill 
                onChange={handleChange} 
                value={editorHtml} 
                modules={modules} 
                formats={formats} 
                bounds=".app" 
                placeholder={placeholder}
                style={editorContainerStyle}
                />
            </div>
        </div>
    );
};

export default Editor;
