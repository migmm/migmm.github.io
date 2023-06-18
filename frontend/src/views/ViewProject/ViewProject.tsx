import React from 'react';
import FormattedView from './FormattedView';
import sampleObject from '../../dummy/sampleObject';

import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import H1 from '../../Styles/H1/H1';
import Paragraph from '../../Styles/Paragraph/Paragraph';


const ViewProject = () => {

    const shortDescription = 'Short Description: ' + sampleObject.shortDescription;
    const projectStatus = 'Project Status: ' + sampleObject.projectStatus;
    const gitURL = (
        <span>
            Git URL: <a href={sampleObject.deployURL}>{sampleObject.deployURL}</a>
        </span>
    );
    const deployURL = (
        <span>
            Deploy URL: <a href={sampleObject.deployURL}>{sampleObject.deployURL}</a>
        </span>
    );
    

    return (
        <CommonStyles>
            <div>
                <H1
                    innerText={sampleObject.projectName}
                />
                <Paragraph
                    innerText={shortDescription}
                />

                <Paragraph
                    innerText={projectStatus}
                />

                <Paragraph
                    innerText={gitURL}
                />

                <Paragraph
                    innerText={deployURL}
                />

                <FormattedView 
                    content={sampleObject.editorHtml}
                />
            </div>
        </CommonStyles>
    );
};

export default ViewProject;
