import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css';

const InputFile = ({ setImagePreview, imagePreview }: any) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        handleFile(file);
    };

    const handleRemoveImage = (event: any) => {
        event.stopPropagation();
        setImagePreview('');
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    };

    const handleImagePreviewClick = (event: any) => {
        if (!imagePreview && inputFileRef.current) {
            inputFileRef.current.click();
        }
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0];
        handleFile(file);
    };

    const handleFile = (file: File | undefined) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <InputFileStyled onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} isDragging={isDragging} draggable="true">
            <InputImage
                type="file"
                id="image"
                name="Image"
                accept="image/png, image/jpeg, image/bmp"
                ref={inputFileRef}
                onChange={handleFileChange}
            />
            <LabelButton htmlFor="image" onClick={handleImagePreviewClick}>
                Select file
            </LabelButton>
            {imagePreview && (
                <ImagePreviewContainer onClick={handleImagePreviewClick}>
                    <ImagePreviewWrapper>
                        <ImagePreview src={imagePreview} alt="Preview" className="image-preview" />
                        <RemoveImageButton onClick={handleRemoveImage}></RemoveImageButton>
                    </ImagePreviewWrapper>
                </ImagePreviewContainer>
            )}
            {!imagePreview && (
                <ImagePreviewPlaceholder onClick={handleImagePreviewClick}>
                    <i className="fas fa-upload fa-5x"></i>
                </ImagePreviewPlaceholder>
            )}
        </InputFileStyled>
    );
};

export default InputFile;

const InputFileStyled = styled.div<{ isDragging: boolean }>`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 20px;
    padding: 1em;
    background-color: ${(props) => (props.isDragging ? '#e2e2e2' : 'transparent')};
`;

const InputImage = styled.input`
    display: none;
`;

const LabelButton = styled.label`
    border-radius: 20px;
    padding: 1em;
    border: 1px solid #ebebeb;
    background-color: #0069c5;
    color: #ffffff;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    text-align: center;
    font-size: 1em;
    width: 50%;
    cursor: pointer;
    margin-bottom: 0.5em;

    @media (min-width: 768px) {
        max-width: 300px;
    }

    :hover {
        background-color: #004a8b;
    }

    :active {
        background-color: #0088ff;
    }
`;

const ImagePreviewContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ImagePreviewWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 196px;
    object-fit: contain;
    border-radius: 20px;
    margin-bottom: 1em;
`;

const RemoveImageButton = styled.button`
    position: absolute;
    top: 25px;
    right: 25px;
    background-color: #000000;
    padding: 0.3em;
    border-radius: 30%;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transform: translate(50%, -50%);
    z-index: 1;

    :hover {
        background-color: #004a8b;
    }

    :active {
        background-color: #0088ff;
    }

    ::before {
        font-family: 'Font Awesome 5 Free';
        content: '\f00d';
        display: block;
        height: 100%;
        width: 100%;
    }
`;

const ImagePreviewPlaceholder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid #ebebeb;
    margin-bottom: 1em;
    border-radius: 20px;
    background-color: #ffffff;
    cursor: pointer;

    :hover {
        background-color: #e2e2e2;
    }

    :active {
        background-color: #e2e2e2;
    }
`;
