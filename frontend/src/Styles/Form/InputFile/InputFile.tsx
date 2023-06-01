import React, { useRef } from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.css';

const InputFile = ({ setImagePreview, imagePreview }: any) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setImagePreview('');
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    };

    const handleImagePreviewClick = () => {
        if (!imagePreview && inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <InputFileStyled>
            <input
                type='file'
                id='image'
                className='image'
                name='Image'
                accept='image/png, image/jpeg, image/bmp'
                ref={inputFileRef}
                onChange={handleFileChange}
            />
            <label htmlFor='image' className='custom-file-upload' onClick={handleImagePreviewClick}>
                Select file
            </label>
            {imagePreview && (
                <div className='image-preview-container' onClick={handleImagePreviewClick}>
                    <div className='image-preview-wrapper'>
                        <img src={imagePreview} alt='Preview' className='image-preview' />
                        <button className='remove-image-button' onClick={handleRemoveImage}></button>
                    </div>
                </div>
            )}
            {!imagePreview && (
                <div className='image-preview-placeholder' onClick={handleImagePreviewClick}>
                    <i className='fas fa-upload fa-5x placeholder-icon'></i>
                </div>
            )}
        </InputFileStyled>
    );
};

const InputFileStyled = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;

    .image {
        display: none;
    }

    .custom-file-upload {
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
    }

    .image-preview-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 200px;
        border: 1px dashed gray;
        margin-bottom: 1em;
        border-radius: 20px;
        background-color: #ebebeb;

        :hover {
            background-color: #dbd6d6;
        }

        :active {
            background-color: #f0f0ee;
        }
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
        border-radius: 20px;
        margin-bottom: 1em;
    }

    .remove-image-button {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #0069c5;
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
    }
    .remove-image-button::before {
        font-family: 'Font Awesome 5 Free';
        content: '\f00d'; /* Código de icono para la 'X' */
        display: block;
        height: 100%;
        width: 100%;
    }
`;

export default InputFile;
