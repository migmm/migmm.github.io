import React from 'react';
import FormattedView from './FormattedView';
import sampleObject from '../../../dummy/sampleObject';

import CommonStyles from '../../Styles/CommonStyles/CommonStyles';
import H1 from '../../Styles/H1/H1';
import Paragraph from '../../Styles/Paragraph/Paragraph';


const ViewProject = () => {

    return (
        <CommonStyles>
            <div>
                <H1 innerText={sampleObject.projectName} />

                <Paragraph>Project Status: {sampleObject.projectStatus}</Paragraph>
                <Paragraph>
                    Git URL: <a href={sampleObject.gitURL}>{sampleObject.gitURL}</a>
                </Paragraph>
                <Paragraph>
                    Deploy URL: <a href={sampleObject.deployURL}>{sampleObject.deployURL}</a>
                </Paragraph>
                <Paragraph>Short Description: {sampleObject.shortDescription}</Paragraph>
                <FormattedView 
                    content={sampleObject.editorHtml} />
            </div>
        </CommonStyles>
    );
};

export default ViewProject;
