import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Styles/Form/Button/Button";
import Label from "../../Styles/Form/Label/Label";
import LabelError from "../../Styles/Form/LabelError/LabelError";
import Input from "../../Styles/Form/Input/Input";
import Textarea from "../../Styles/Form/Textarea/Textarea";
import H1 from "../../Styles/H1/H1";
import InputFile from "../../Styles/Form/InputFile/InputFile";

const AddCertificate = () => {
  const [imagePreview, setImagePreview] = useState("");

  const handleReset = () => {
    setImagePreview("");
  };

  return (
    <AddScreenStyles>
      <div className="certification-container">
        <H1>New Certification</H1>
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
              <Label htmlFor="certification-image">Image</Label>
              <InputFile setImagePreview={setImagePreview} imagePreview={imagePreview} />
              <LabelError>Error</LabelError>
            </div>
            <div className="input-group">
              <Button type="submit">Add</Button>
              <Button type="reset" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AddScreenStyles>
  );
};

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

    .image-preview-placeholder {
        width: 200px;
        height: 200px;
        border: 1px dashed gray;
    }

    .image-preview-container {
        position: relative;
        display: inline-block;
    }

    .image-preview-wrapper {
        position: relative;
        display: inline-block;
    }

    .image-preview {
        max-width: 100%;
        max-height: 200px;
        object-fit: contain;
    }

    .remove-image-button {
        position: absolute;
        top: 0;
        right: 0;
        background: transparent;
        border: none;
        color: red;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        transform: translate(50%, -50%);
        z-index: 1;
    }
`;

export default AddCertificate;
