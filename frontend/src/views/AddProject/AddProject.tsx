import React from "react";
import styled from "styled-components";
import { Button } from "../../Styles/Form/Button/Button";
import { Label } from "../../Styles/Form/Label/Label";
import { LabelError } from "../../Styles/Form/LabelError/LabelError";
import { Input } from "../../Styles/Form/Input/Input";
import { Textarea } from "../../Styles/Form/Textarea/Textarea";
import InputFile  from "../../Styles/Form/InputFile/InputFile";
import { H1 } from "../../Styles/H1/H1";

const AddProject = () => {
    return (
        <AddScreenStyles>
            <div className="project-container">
                <H1>Add Project</H1>
                <div className="add-form-container">
                    <form action="#">
                        <div className="input-group">
                            <Label htmlFor="project-name">Project title</Label>
                            <Input type="text" id="projectName" name="projectName" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-vendor">Vendor</Label>
                            <Input type="text" name="projectVendor" id="project-vendor"></Input>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-url">URL</Label>
                            <Input type="text" id="project-url" name="projectUrl" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-description">Description</Label>
                            <Textarea name="projectDescription" id="project-description"></Textarea>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="project-image">Image</Label>
                            <InputFile ></InputFile>
                            <LabelError>Error</LabelError>
                        </div>
                        <div className="input-group">
                            <Button type="submit">Add</Button>
                            <Button type="reset">Reset</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AddScreenStyles>
    );
};

export default AddProject;

const AddScreenStyles = styled.main`
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
