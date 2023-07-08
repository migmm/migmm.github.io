import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import Input from '../../Styles/Form/Input/Input';
import Select from '../../Styles/Form/Select/Select';
import InputFile from '../../Styles/Form/InputFile/InputFile';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import Textarea from '../../Styles/Form/Textarea/Textarea';
import H1 from '../../Styles/H1/H1';
import Checkbox from '../../Styles/Form/CheckBox/CheckBox';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';
import convertBase64ToBlob from '../../utils/base64toImage';
import ContainerStyles from '../../Styles/Container/Container';
import { apiURL } from '../../config/urls';
import ButtonGroup from '../../Styles/Form/ButtonGroup/ButtonGroup';
import { useParams } from 'react-router-dom';
import sampleObject from '../../dummy/sampleObject';


const AddProject = () => {
    interface ProjectData {
        id: number | null;
        projectName: string;
        projectStatus: string;
        showInLandPage: boolean;
        gitURL: string;
        deployURL: string;
        shortDescription: string;
        editorHtml: string;
    }

    const [imagePreview, setImagePreview] = useState<string>(sampleObject.coverImage || '');
    const [editorHtml, setEditorHtml] = useState<string>(sampleObject.editorHtml || '');

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const [showInLandPage, setShowInLandPage] = useState(false);

    const [h1Text, setH1Text] = useState('');

    const [projectData, setProjectData] = useState<ProjectData | null>(null);

    const { projectId } = useParams();

    useEffect(() => {
        if (projectId) {
            setH1Text('Edit');
            setProjectData(sampleObject);
        } else {
            setH1Text('New Project');
            setProjectData(null);
        }
    }, [projectId]);

    const handleFileChange = (imageData: string) => {
        setImagePreview(imageData);
        handleChange('coverImage', imageData);
    };

    const handleEditorChange = (value: string) => {
        setEditorHtml(value);
        handleChange('editorHtml', value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const base64Image = fields.coverImage;
        const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

        const data = {
            coverImage: blob,
            ...fields,
            showInLandPage: showInLandPage ? true : false,
        };

        console.log('Data:', data);

        if (validateForm(fields)) {
            try {
                console.log('send');
                const response = await axios.post(`${apiURL}projects`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    /*  navigate('/'); */
                }
            } catch (error: any) {
                if (error.response) {
                    /*   const { status, data } = error.response;
                    if (status === 401) {
                        if (data.message === 'Existing username') {
                            setError(validations.username.existingMessage);
                        } else if (data.message === 'Existing email') {
                            setError(validations.email.existingMessage);
                        }
                    }  */
                } else {
                    setError(validations.commonError.errorMessage);
                    console.error(error);
                }
            }
        }

        setButtonMessage(false);
    };

    return (
        <CommonStyles>
            <ContainerStyles>
                <H1 innerText={h1Text} />

                <div className='add-form-container'>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor='project-name' innerText='Project title *' />

                            <Input
                                type='text'
                                id='projectName'
                                name='projectName'
                                value={projectData?.projectName || fields.projectName}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.projectName} />

                            <Label htmlFor='project-status' innerText='Status *' />
                            <Select
                                name='projectStatus'
                                id='project-status'
                                value={projectData?.projectStatus || fields.projectStatus}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            >
                                <option value=''>Select status</option>
                                <option value='inProgress'>In Progress</option>
                                <option value='finished'>Finished</option>
                                <option value='cancelled'>Cancelled</option>
                            </Select>
                            <LabelError innerText={errors.projectStatus} />

                            <Checkbox
                                name='showInLandPage'
                                checked={projectData?.showInLandPage || showInLandPage}
                                onChange={(isChecked: boolean) => setShowInLandPage(isChecked)}
                                label='Show in landing page'
                            />

                            <Label htmlFor='git-url' innerText='GIT URL *' />

                            <Input
                                type='text'
                                id='git-url'
                                name='gitURL'
                                value={projectData?.gitURL || fields.gitURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.gitURL} />

                            <Label htmlFor='deploy-url' innerText='Deploy URL' />

                            <Input
                                type='text'
                                id='deploy-url'
                                name='deployURL'
                                value={projectData?.deployURL || fields.deployURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.deployURL} />

                            <Label htmlFor='short-description' innerText='Short description *' />

                            <Textarea
                                id='short-description'
                                name='shortDescription'
                                value={projectData?.shortDescription || fields.shortDescription}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.shortDescription} />

                            <Label htmlFor='cover-image' innerText='Cover Image *' />
                            <InputFile setImagePreview={handleFileChange} imagePreview={imagePreview} id='cover-image' name='coverImage' />
                            <LabelError innerText={errors.coverImage} />

                            <Label htmlFor='project-description' innerText='Project description *' />
                            <ReactQuill value={projectData?.editorHtml || editorHtml} onChange={handleEditorChange} placeholder='Enter text...' />
                            <LabelError innerText={errors.editorHtml} />
                        </InputGroup>

                        <LabelError innerText={error} />

                        <ButtonGroup>
                            <Button type='submit' disabled={buttonMessage} innerText={buttonMessage ? 'Wait..' : 'Add'} />

                            <Button type='reset' onClick={handleReset} innerText='Reset' />
                        </ButtonGroup>
                    </form>
                </div>
            </ContainerStyles>
        </CommonStyles>
    );
};

export default AddProject;
