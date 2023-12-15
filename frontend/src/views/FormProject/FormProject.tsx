import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ReactQuill from '../../components/Quill/Quill';
import 'react-quill/dist/quill.snow.css';

import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import Button from '../../Styles/Form/Button/Button';
import Label from '../../Styles/Form/Label/Label';
import Input from '../../Styles/Form/Input/Input';
import Select from '../../Styles/Form/Select/Select';
import InputFile from '../../Styles/Form/InputFile/InputFile';
import LabelError from '../../Styles/Form/LabelError/LabelError';
import H1 from '../../Styles/H1/H1';
import Checkbox from '../../Styles/Form/CheckBox/CheckBox';
import InputGroup from '../../Styles/Form/InputGroup/InputGroup';
import Paragraph from '../../Styles/Paragraph/Paragraph';

import useFormUtils from '../../hooks/useFormUtils';
import convertBase64ToBlob from '../../utils/base64toImage';
import ContainerStyles from '../../Styles/Container/Container';

import ButtonGroup from '../../Styles/Form/ButtonGroup/ButtonGroup';

import { validations, initialFields } from './validations';
import { useValidation } from '../../hooks/useValidations';
import { apiURL } from '../../config/urls';
import { ProjectData } from './Interfaces';
import showdown from 'showdown';

const converted = new showdown.Converter();
converted.setOption('tables', true);


const AddProject = () => {
    const [imagePreview, setImagePreview] = useState<string>('');
    const [editorHtml, setEditorHtml] = useState<string>('');

    const [error, setError] = useState('');
    const [buttonMessage, setButtonMessage] = useState(false);

    const { errors, validateForm } = useValidation(validations);
    const { fields, handleChange, handleReset } = useFormUtils(initialFields);

    const [showInLandPage, setShowInLandPage] = useState(false);

    const [h1Text, setH1Text] = useState('');

    const [projectData, setProjectData] = useState<ProjectData | null>(null);

    const { projectId } = useParams();

    const [showReadme, setShowReadme] = useState(false);
    const [, setReadmeContent] = useState('');

    const navigate = useNavigate();

    const fetchReadmeContent = async (githubURL: string) => {
        try {
            const urlParts = githubURL.split('/');
            const user = urlParts[3];
            const repository = urlParts[4];

            const response = await axios.get(`https://api.github.com/repos/${user}/${repository}/contents/README.md`, {
                headers: {
                    Accept: 'application/vnd.github.v3.raw',
                },
            });

            console.log('README.md found');
            const readmeContent = response.data;

            const html = converted.makeHtml(readmeContent);
            console.log(html)
            handleEditorChange(html);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.log('README.md not found');
                setReadmeContent('README not found');
            } else {
                console.error(error);
                setReadmeContent('Error fetching README');
            }
        }
    };

    const handleFileChange = (imageData: string) => {
        setImagePreview(imageData);
        handleChange('coverImage', imageData);
    };

    const handleEditorChange = (value: string) => {
        setEditorHtml(value);
        handleChange('editorHtml', value);
    };

    useEffect(() => {
        const fetchProjectDataToEdit = async () => {
            if (projectId) {
                setH1Text('Edit');
                try {
                    if (projectId) {
                        const response = await axios.get(`${apiURL}projects/${projectId}`);
                        console.log(response)
                        handleChange('projectName', response.data.projectName);
                        handleChange('shortDescription', response.data.shortDescription);
                        handleChange('projectStatus', response.data.projectStatus);
                        handleChange('showInLandPage', response.data.showInLandPage);
                        handleChange('gitURL', response.data.gitURL);
                        handleChange('showReadme', response.data.showReadme);
                        handleChange('deployURL', response.data.deployURL);
                        handleChange('titleCkeck', response.data.titleCkeck);
                        handleChange('tags', response.data.tags);

                        handleEditorChange(response.data.editorHtml);

                        handleFileChange(response.data.coverImage);
                    }
                } catch (error) {
                    console.error('Error fetching project data:', error);
                }
            } else {
                setH1Text('New Project');
                setProjectData(null);
            }
        };
        fetchProjectDataToEdit();
    }, [projectId]);

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
            showReadme: showReadme ? true : false,
        };

        console.log('Data:', data);
        console.log(validateForm(fields));
        console.log(errors);

        if (validateForm(fields)) {
            try {
                console.log('send');
                const response = await axios.post(`${apiURL}projects`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    navigate('/');
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

                <div className="add-form-container">
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor="project-name" innerText="Project title *" />

                            <Input
                                type="text"
                                id="projectName"
                                name="projectName"
                                value={projectData?.projectName || fields.projectName}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.projectName} />
                            <Label htmlFor="short-description" innerText="Short description *" />

                            <Input
                                type="text"
                                id="shortDescription"
                                name="shortDescription"
                                value={projectData?.shortDescription || fields.shortDescription}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.shortDescription} />

                            <Label htmlFor="project-status" innerText="Status *" />
                            <Select
                                name="projectStatus"
                                id="project-status"
                                value={projectData?.projectStatus || fields.projectStatus}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            >
                                <option value="">Select status</option>
                                <option value="inProgress">In Progress</option>
                                <option value="finished">Finished</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                            <LabelError innerText={errors.projectStatus} />

                            <Checkbox
                                name="showInLandPage"
                                checked={projectData?.showInLandPage || showInLandPage}
                                onChange={(isChecked: boolean) => setShowInLandPage(isChecked)}
                                label="Show in landing page"
                            />

                            <Label htmlFor="git-url" innerText="GIT URL *" />
                            <Input
                                type="text"
                                id="git-url"
                                name="gitURL"
                                value={projectData?.gitURL || fields.gitURL}
                                onChange={(e) => {
                                    const gitURL = e.target.value;
                                    handleChange(e.target.name, gitURL);
                                    /* if (gitURL) {
                                        fetchReadmeContent(gitURL);
                                    } */
                                }}
                            />

                            {fields.gitURL && (
                                <Checkbox
                                    name="showReadme"
                                    checked={showReadme}
                                    onChange={(isChecked: any) => {
                                        setShowReadme(isChecked);
                                        if (isChecked && fields.gitURL) {
                                            fetchReadmeContent(fields.gitURL);
                                        }
                                    }}
                                    label="Use README"
                                />
                            )}

                            <LabelError innerText={errors.gitURL} />

                            <Label htmlFor="deploy-url" innerText="Deploy URL" />

                            <Input
                                type="text"
                                id="deploy-url"
                                name="deployURL"
                                value={projectData?.deployURL || fields.deployURL}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <Paragraph innerText="If you leave the input blank, it will not be checked." />
                            <LabelError innerText={errors.deployURL} />

                            <Label htmlFor="title-check" innerText="Title to ckeck" />

                            <Input
                                type="text"
                                id="title-check"
                                name="titleCheck"
                                value={projectData?.titleCheck || fields.titleCheck}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <Paragraph innerText="Insert a title of your website for cron to check its online status." />
                            <LabelError innerText={errors.titleCheck} />
                            <Label htmlFor="tags" innerText="Tags *" />

                            <Input
                                type="text"
                                id="tags"
                                name="tags"
                                value={projectData?.tags || fields.tags}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            />
                            <LabelError innerText={errors.tags} />

                            <Label htmlFor="cover-image" innerText="Cover Image *" />

                            <InputFile setImagePreview={handleFileChange} imagePreview={imagePreview} id="coverImage" name="coverImage" />
                            <LabelError innerText={errors.coverImage} />

                            <Label htmlFor="project-description" innerText="Project description *" />
                            <ReactQuill value={projectData?.editorHtml || editorHtml} onChange={handleEditorChange} placeholder="Enter text..." />

                            <LabelError innerText={errors.editorHtml} />
                        </InputGroup>

                        <LabelError innerText={error} />

                        <ButtonGroup>
                            <Button type="submit" disabled={buttonMessage} innerText={buttonMessage ? 'Wait..' : 'Save'} />

                            <Button type="reset" onClick={handleReset} innerText="Reset" />
                        </ButtonGroup>
                    </form>
                </div>
            </ContainerStyles>
        </CommonStyles>
    );
};

export default AddProject;
