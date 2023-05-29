import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import { Button } from "../../Styles/Form/Button/Button";
import { Label } from "../../Styles/Form/Label/Label";
import { LabelError } from "../../Styles/Form/LabelError/LabelError";
import { Input } from "../../Styles/Form/Input/Input";
import { H1 } from "../../Styles/H1/H1";

type Resize = "none" | "both" | "horizontal" | "vertical" | "initial" | "inherit";

const AddProject = ({ placeholder }: any) => {
    const [editorHtml, setEditorHtml] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectVendor, setProjectVendor] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [error, setError] = useState("");

    const handleChange = (html: any) => {
        setEditorHtml(html);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        axios
            .post("http://localhost:8080/api/projects", {
                projectName,
                projectVendor,
                projectUrl,
                editorHtml,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data.message);
                } else {
                    setError("An error occurred. Please try again later.");
                }
                console.error(error);
            });
    };

    const editorStyle: React.CSSProperties = {
        height: "400px",
        width: "100%",
        resize: "vertical" as Resize,
        overflow: "auto",
        borderRadius: "10px",
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
        <AddProjectStyles>
            <div className="project-container">
                <H1>Add Project</H1>
                <div className="add-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <Label htmlFor="project-name">Project title</Label>
                            <Input
                                type="text"
                                id="projectName"
                                name="projectName"
                                value={projectName}
                                onChange={(event) => setProjectName(event.target.value)}
                            />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-vendor">Vendor</Label>
                            <Input
                                type="text"
                                name="projectVendor"
                                id="project-vendor"
                                value={projectVendor}
                                onChange={(event) => setProjectVendor(event.target.value)}
                            />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-url">URL</Label>
                            <Input
                                type="text"
                                id="project-url"
                                name="projectUrl"
                                value={projectUrl}
                                onChange={(event) => setProjectUrl(event.target.value)}
                            />
                            <LabelError>Error</LabelError>
                            <div
                                style={{
                                    backgroundColor: "white",
                                    width: "100%",
                                    borderRadius: "10px",
                                    margin: "0 auto",
                                }}
                            >
                                <ReactQuill
                                    onChange={handleChange}
                                    value={editorHtml}
                                    modules={modules}
                                    formats={formats}
                                    bounds=".app"
                                    placeholder={placeholder}
                                    style={editorStyle}
                                />
                            </div>
                            <LabelError>Error</LabelError>
                        </div>
                        <div className="input-group">
                            <Button type="submit">Add</Button>
                            <Button type="reset">Reset</Button>
                        </div>
                    </form>
                </div>
            </div>
            {error && <div>Error: {error}</div>}
        </AddProjectStyles>
    );
};

export default AddProject;

const AddProjectStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    .project-container {
        margin: 1em;

        .add-form-container {
            form {
                .input-group {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .input-group:last-child {
                    display: flex;
                    flex-direction: row;
                    gap: 1em;
                }
            }
        }
    }
`;
