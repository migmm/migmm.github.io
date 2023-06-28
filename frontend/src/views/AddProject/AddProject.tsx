import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
import convertBase64ToBlob from '../../utils/base64toImage';
import ContainerStyles from '../../Styles/Container/Container';
import { apiURL } from '../../config/urls';
import ButtonGroup from '../../Styles/Form/ButtonGroup/ButtonGroup';

const AddProject = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const formData = new FormData();
  const [error, setError] = useState('');
  const [buttonMessage, setButtonMessage] = useState(false);
  const [showInLandPage, setShowInLandPage] = useState(false);
  const [useFromGit, setUseFromGit] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');

  const { errors, validateForm } = useValidation(validations);
  const { fields, handleChange, handleReset } = useFormUtils(initialFields);

  const handleFileChange = (imageData:any) => {
    setImagePreview(imageData);
    handleChange('coverImage', imageData);
  };

  const handleEditorChange = (html:any) => {
    setEditorHtml(html);
    handleChange('editorHtml', html);
  };

  const handleUseFromGitChange = (isChecked:any) => {
    setUseFromGit(isChecked);
    if (isChecked) {
      // Aquí puedes realizar una llamada a la API o usar una biblioteca de Markdown para obtener el contenido del archivo README.md desde la URL fields.gitURL
      // Por simplicidad, en este ejemplo, asumimos que el contenido del archivo README.md se establece en un estado directamente
      setReadmeContent('Contenido del archivo README.md');
    } else {
      setReadmeContent('');
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    setButtonMessage(true);

    const base64Image = fields.coverImage;
    const blob = convertBase64ToBlob(base64Image, 'image/jpeg');

    formData.append('coverImage', blob, 'coverImage.jpg');
    formData.append('showInLandPage', showInLandPage ? 'true' : 'false');

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        if (fields.hasOwnProperty(key) && key !== 'showInLandPage' && key !== 'coverImage') {
          formData.append(key, fields[key]);
        }
      }
    }

    console.log('-- Start Form data --');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log('-- End Form data --');

    if (validateForm(fields)) {
      try {
        const response = await axios.post(`${apiURL}addproject`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          /*  navigate('/'); */
        }
      } catch (error:any) {
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
        <H1 innerText='New Project' />

        <div className='add-form-container'>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor='project-name' innerText='Project title *' />

              <Input
                type='text'
                id='projectName'
                name='projectName'
                value={fields.projectName}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <LabelError innerText={errors.projectName} />

              <Label htmlFor='project-status' innerText='Status *' />
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
              <LabelError innerText={errors.projectStatus} />

              <Checkbox
                name='showInLandPage'
                checked={showInLandPage}
                onChange={(isChecked:any) => setShowInLandPage(isChecked)}
                label='Show in landing page'
              />
              <LabelError innerText={errors.useFromGit} />

              <Label htmlFor='git-url' innerText='GIT URL *' />

              <Input
                type='text'
                id='git-url'
                name='gitURL'
                value={fields.gitURL}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <LabelError innerText={errors.gitURL} />

              <Label htmlFor='deploy-url' innerText='Deploy URL' />

              <Input
                type='text'
                id='deploy-url'
                name='deployURL'
                value={fields.deployURL}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <LabelError innerText={errors.deployURL} />

              <Label htmlFor='short-description' innerText='Short description *' />

              <Textarea
                id='short-description'
                name='shortDescription'
                value={fields.shortDescription}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <LabelError innerText={errors.shortDescription} />

              <Label htmlFor='cover-image' innerText='Cover Image *' />
              <InputFile
                setImagePreview={handleFileChange}
                imagePreview={imagePreview}
                id='cover-image'
                name='coverImage'
              />
              <LabelError innerText={errors.coverImage} />

              <Label htmlFor='project-description' innerText='Project description *' />

              <Checkbox
                name='useFromGit'
                checked={useFromGit}
                onChange={(isChecked:any) => handleUseFromGitChange(isChecked)}
                label='Use project README.md content'
              />
              <LabelError innerText={errors.useFromGit} />

              {!useFromGit && (
                <QuillEditor
                  editorHtml={editorHtml}
                  handleEditorChange={handleEditorChange}
                  placeholder='Enter project description'
                />
              )}

              {useFromGit && readmeContent && (
                <div>
                  <ReactMarkdown>{readmeContent}</ReactMarkdown>
                </div>
              )}

              <LabelError innerText={errors.editorHtml} />

              <ButtonGroup>
                <Button type='submit' disabled={buttonMessage}
                innerText={buttonMessage ? 'Creating...' : 'Create project'} />
         
                <Button type='reset' onClick={handleReset} innerText='Reset' />
                
             
              </ButtonGroup>
            </InputGroup>
          </form>
        </div>
      </ContainerStyles>
    </CommonStyles>
  );
};

export default AddProject;
