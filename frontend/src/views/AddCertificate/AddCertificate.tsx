import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Label } from "../../components/Form/Label/Label";
import { LabelError } from "../../components/Form/LabelError/LabelError";
import { Input } from "../../components/Form/Input/Input";
import { Textarea } from "../../components/Form/Textarea/Textarea";
import { H1 } from "../../Styles/H1/H1";

const AddCertificate = () => {
    return (
        <AddScreenStyles>
            <div className="certification-container">
                <H1>Add Certification</H1>
                <div className="add-form-container">
                    <form action="#">
                        <div className="input-group">
                            <Label htmlFor="certification-name">Certification title</Label>
                            <Input type="text" id="certificationName" name="certificationName" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-vendor">Vendor</Label>
                            <Input type="text" name="certificationVendor" id="certification-vendor"></Input>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-url">URL</Label>
                            <Input type="text" id="certification-url" name="certificationUrl" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-description">Description</Label>
                            <Textarea name="certificationDescription" id="certification-description"></Textarea>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-description">Image</Label>
                            <input type="file" id="certification-image" name="certificationImage" accept="image/png, image/jpeg"></input>
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

export default AddCertificate;

const AddScreenStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    .certification-container {

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
