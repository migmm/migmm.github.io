import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Button from "../../Styles/Form/Button/Button";
import Label from "../../Styles/Form/Label/Label";
import Input from "../../Styles/Form/Input/Input";
import Select from "../../Styles/Form/Select/Select";
import InputFile from "../../Styles/Form/InputFile/InputFile";
import LabelError from "../../Styles/Form/LabelError/LabelError";
import Textarea from "../../Styles/Form/Textarea/Textarea";
import H1 from "../../Styles/H1/H1";
import Checkbox from "../../Styles/Form/CheckBox/CheckBox";
import QuillEditor from "./Quill";

const AddProject = () => {
    const [imagePreview, setImagePreview] = useState("");
    const [editorHtml, setEditorHtml] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        errorTitle: "",
        category: "",
        errorCategory: "",
        projectName: "",
        projectStatus: "",
        projectUrl: "",
        shortDescription: "",
        error: "",
        imageCount: 0,
        isCheckedA: false,
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
    };

    const {
        title,
        category,
        projectName,
        projectStatus,
        projectUrl,
        shortDescription,
        isCheckedA,
    } = formData;

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);

        axios
            .post("/api/projects", formData)
            .then((response) => {
                
                console.log(response.data);
            })
            .catch((error) => {
                
                console.error(error);
            });
    };

    return (
        <AddProjectStyles>
            <div className="project-container">
                <H1>New Project</H1>
                <div className="add-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <Label htmlFor="project-name">Project title</Label>
                            <Input type="text" id="projectName" name="projectName" value={projectName} onChange={handleChange} />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-status">Status</Label>
                            <Select name="projectStatus" id="project-status" value={projectStatus} onChange={handleChange}>
                                <option value="">Select status</option>
                                <option value="inProgress">In Progress</option>
                                <option value="finished">Finished</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                            <LabelError>Error</LabelError>

                            <div
                                style={{
                                    fontFamily: "Work Sans",
                                    margin: "0 auto",
                                    padding: "0 0 1em 0",
                                }}
                            >
                                {
                                    <Checkbox
                                        handleChange={handleCheckboxChange}
                                        isChecked={isCheckedA}
                                        label=" Show on landing page"
                                        id="checkbox-main-project"
                                    />
                                }
                            </div>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-url">URL</Label>
                            <Input type="text" id="project-url" name="projectUrl" value={projectUrl} onChange={handleChange} />
                            <LabelError>Error</LabelError>

                            <Label htmlFor="short-description">Short description</Label>
                            <Textarea id="short-description" name="shortDescription" value={shortDescription} onChange={handleChange} />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-image">Cover Image</Label>
                            <InputFile setImagePreview={setImagePreview} imagePreview={imagePreview} />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-description">Project description</Label>
                            <div
                                style={{
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                                /*   onDrop={handleDrop} */
                            >
                                <QuillEditor 
                                    placeholder="Enter text..." 
                                    onChange={handleEditorChange}
                                    value={editorHtml} 
                                />
                            </div>
                            <LabelError>Error</LabelError>
                        </div>
                        <div className="input-group">
                            <Button type="submit">Add</Button>
                            {/*  <Button onClick={handleReset}>Reset</Button> */}
                        </div>
                    </form>
                </div>
            </div>
        </AddProjectStyles>
    );
};

export default AddProject;

const AddProjectStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

    .project-container {
        margin: 1em;

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
`;
