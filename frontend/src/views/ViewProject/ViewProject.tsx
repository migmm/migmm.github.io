import React from 'react';
import FormattedView from './FormattedView';

const ViewProject = () => {
    const content = '<h1>Titulo del Proyecto</h1><p>Contenido del proyecto...</p>';
    const title = 'Project Title';
    const url = 'Project URL';
    const status = 'Project Status';

    return (<div>
        <p>Title: {title}</p>
        <p>URL: {url}</p>
        <p>Status: {status}</p>
        <FormattedView content={content} />
    </div>);
};

export default ViewProject;
