import React, { useState } from 'react';
import axios from 'axios';

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
import QuillEditor from '../../components/Quill/Quill';
import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import useFormUtils from '../../hooks/useFormUtils';

const AddProject = () => {
    const [imagePreview, setImagePreview] = useState('');
    const [editorHtml, setEditorHtml] = useState('');

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const [showInLandPage, setShowInLandPage] = useState(false);

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
        handleChange('editorHtml', html);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setButtonMessage(true);

        const data = {
            ...fields,
            showInLandPage: showInLandPage,
        };

        console.log(data);

        if (validateForm(fields)) {
            try {
                const response = await axios.post('http://localhost:8080/api/users', data, {
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
            <div className='project-container'>
                <H1>New Project</H1>
                <div className='add-form-container'>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor='project-name'>Project title</Label>
                            <Input
                                type='text'
                                id='projectName'
                                name='projectName'
                                value={fields.projectName}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.projectName}</LabelError>

                            <Label htmlFor='project-status'>Status</Label>
                            <Select
                                name='projectStatus'
                                id='project-status'
                                value={fields.projectStatus}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            >
                                <option value=''>Select status</option>
                                <option value='inProgress'>In Progress</option>
                                <option value='finished'>Finished</option>
                                <option value='cancelled'>Cancelled</option>
                            </Select>
                            <LabelError>{errors.projectStatus}</LabelError>

                            <Checkbox
                                name='showInLandPage'
                                checked={showInLandPage}
                                onChange={(isChecked: boolean) => setShowInLandPage(isChecked)}
                                label='Show in landing page'
                            />

                            <div
                                style={{
                                    fontFamily: 'Work Sans',
                                    margin: '0 auto',
                                    padding: '0 0 1em 0',
                                }}
                            ></div>
                            <LabelError>{errors.showInLandPage}</LabelError>

                            <Label htmlFor='git-url'>GIT URL</Label>
                            <Input
                                type='text'
                                id='git-url'
                                name='gitURL'
                                value={fields.gitURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.gitURL}</LabelError>

                            <Label htmlFor='deploy-url'>Deploy URL</Label>
                            <Input
                                type='text'
                                id='deploy-url'
                                name='deployURL'
                                value={fields.deployURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.deployURL}</LabelError>

                            <Label htmlFor='short-description'>Short description</Label>
                            <Textarea
                                id='short-description'
                                name='shortDescription'
                                value={fields.shortDescription}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError>{errors.shortDescription}</LabelError>

                            <Label htmlFor='certification-image'>Cover Image</Label>
                            <InputFile setImagePreview={setImagePreview} imagePreview={imagePreview} />
                            <LabelError>{errors.coverImage}</LabelError>

                            <Label htmlFor='project-description'>Project description</Label>
                            <div
                                style={{
                                    width: '100%',
                                    margin: '0 auto',
                                }}
                                /*   onDrop={handleDrop} */
                            >
                                <QuillEditor placeholder='Enter text...' onChange={handleEditorChange} value={editorHtml} />
                            </div>
                            <LabelError>{errors.editorHtml}</LabelError>
                        </InputGroup>
                        <LabelError>{error}</LabelError>

                        <InputGroup>
                            <Button type='submit' disabled={buttonMessage}>
                                {buttonMessage ? 'Wait..' : 'Add'}
                            </Button>
                            <Button type='reset' onClick={handleReset}>
                                Reset
                            </Button>
                        </InputGroup>
                    </form>
                </div>
            </div>
        </CommonStyles>
    );
};

export default AddProject;
