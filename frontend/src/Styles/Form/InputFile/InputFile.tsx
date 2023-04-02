import React from "react";
import styled from "styled-components";

const InputFile = () => {
    return (
        <InputFileStyled>
            <input
                type="file"
                id="certification-image"
                className="certification-image"
                name="certificationImage"
                accept="image/png, image/jpeg, image/bmp"
            ></input>
            <label htmlFor="certification-image" className="custom-file-upload">
                Select file
            </label>
        </InputFileStyled>
    );
};

export default InputFile;

const InputFileStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    .certification-image {
        display: none;
    }

    .custom-file-upload {
        border-radius: 20px;
        padding: 1em;
        border: 1px solid #ebebeb;
        background-color: #0069c5;
        color: #ffffff;
        font-family: "Work Sans", sans-serif;
        font-weight: 600;
        text-align: center;
        font-size: 1em;
        width: 50%;
        cursor: pointer;

        @media (min-width: 768px) {
            max-width: 300px;
        }

        :hover {
            background-color: #004a8b;
        }

        :active {
            background-color: #0088ff;
        }
    }
`;
