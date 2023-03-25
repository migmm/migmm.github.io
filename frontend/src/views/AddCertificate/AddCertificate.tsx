import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Form/Button/Button";
import { Label } from "../../components/Form/Label/Label";
import { LabelError } from "../../components/Form/LabelError/LabelError";
import { Input } from "../../components/Form/Input/Input";
import { H1 } from "../../Styles/H1/H1";

const AddCertificate = () => {
    return (
        <AddScreenStyles>
            <div className="certification-container">
                <H1>Add Certification</H1>
                <div className="Add-form-container">
                    <form action="#">
                        <div className="input-group">
                            <Label htmlFor="certification-name">Certification title</Label>
                            <Input type="text" id="certificationName" name="certificationName" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-vendor">Vendor</Label>
                            <textarea name="certificationVendor" id="certification-vendor"></textarea>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-url">URL</Label>
                            <Input type="certification-url" id="certification-url" name="certificationUrl" />
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-description">Description</Label>
                            <textarea name="certificationDescription" id="certification-description"></textarea>
                            <LabelError>Error</LabelError>
                            <Label htmlFor="certification-description">Image</Label>
                            <input type="file" name="certificationImage" id="certification-image">
                                Add image
                            </input>
                            <LabelError>Error</LabelError>
                        </div>
                        <div className="input-group">
                            <Button type="submit">Login</Button>
                            <Button type="reset">Reset</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AddScreenStyles>
    );
};

export default AddCertificate;

const AddScreenStyles = styled.main``;
