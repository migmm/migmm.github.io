import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import FormattedView from './FormattedView';
import sampleObject from '../../dummy/sampleObject';

import H1 from '../../Styles/H1/H1';
import Paragraph from '../../Styles/Paragraph/Paragraph';
import styled from 'styled-components';

interface HeroStylesProps {
    bg: string;
}

const ViewProject = () => {
    const tags = sampleObject.tags;
    const Category = (
        <span>
            <strong>Category:</strong> {sampleObject.category}
        </span>
    );

    const projectStatus = (
        <span>
            <strong>Project Status:</strong> {sampleObject.projectStatus}
        </span>
    );

    const gitURL = (
        <span>
            <strong>Git URL:</strong> <a href={sampleObject.deployURL}>{sampleObject.deployURL}</a>
        </span>
    );

    const deployURL = (
        <span>
            <strong>Deploy URL:</strong> <a href={sampleObject.deployURL}>{sampleObject.deployURL}</a>
        </span>
    );

    const lastUpdate = (
        <span>
            <strong>Last update:</strong> {sampleObject.lastUpdate}
        </span>
    );

const projectImage = sampleObject.coverImage;

    const BalloonContainer = ({ tags }: any) => {
        const words = tags.split(',');

        const balloons = words.map((word: any, index: any) => (
            <Balloon key={index} className='balloon'>
                <a href={`/link/${word}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {word}
                </a>
            </Balloon>
        ));

        return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{balloons}</div>;
    };

    const MyComponent = ({ htmlContent }: any) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: htmlContent,
                }}
            />
        );
    };

    return (
        <ProjectViewContainer>
            <div>
                <ActualRoute>
                    <Link to='/'>
                        {' '}
                        <FontAwesomeIcon icon={faHome} />
                    </Link>{' '}
                    / <Link to='/projects'>Projects</Link> / {sampleObject.projectName}
                </ActualRoute>
                <HeroStyles bg={projectImage}>
                    <HeroLeft>
                        {' '}
                        <MyComponent htmlContent={sampleObject.headerTitle} />{' '}
                    </HeroLeft>
                    <HeroRight>
                        <img src={projectImage} alt='Logo' />
                    </HeroRight>
                </HeroStyles>
                <Content>
                    <div className='information'>
                        <H1 innerText={sampleObject.projectName} />
                        <Paragraph innerText={Category} />
                        <Paragraph innerText={projectStatus} />
                        <Paragraph innerText={gitURL} />
                        <Paragraph innerText={deployURL} />
                        <Paragraph innerText={lastUpdate} />
                        <BalloonContainer tags={tags} />
                    </div>
                    <FormattedView content={sampleObject.editorHtml} />
                </Content>
                <Link to={`/editproject/${sampleObject.id}`}>
                    <button>Edit</button>
                </Link>
            </div>
        </ProjectViewContainer>
    );
};

export default ViewProject;

const ProjectViewContainer = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    padding: 1em;

    @media (min-width: 768px) {
        max-width: 1500px;
    }
`;

const ActualRoute = styled.div`
    margin-top: 30px;
    width: 100%;
    font-family: 'Work Sans', sans-serif;
    font-size: 1em;
    font-weight: 500;

    a {
        text-decoration: none;
    }
    a:visited {
        color: black;
    }
`;

const HeroStyles = styled.div<HeroStylesProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: unset;
    position: relative;

    @media (min-width: 950px) {
        flex-direction: row;
        height: 600px;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${(props) => props.bg});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: left center;
        filter: grayscale(100%);
        opacity: 0.1;
        z-index: -1;
    }
`;

const HeroLeft = styled.div`
    width: 90%;
    font-family: 'Work Sans', sans-serif;
    font-size: 2em;
    font-weight: 700;
    margin: 2em 0 2em 0;
    text-align: center;

    @media (min-width: 950px) {
        width: 60%;
        text-align: left;
        font-size: 2.5em;
    }

`;

const HeroRight = styled.div`
    width: 90%;
    img {
        width: 100%;
    }

    @media (min-width: 950px) {
        width: 40%;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;

    .information {
        align-self: flex-start;
    }

    @media (min-width: 950px) {
        flex-direction: row;
    }
`;

const Balloon = styled.div`
    font-family: 'Work Sans', sans-serif;
    background-color: #3498db;
    color: #fff;
    border-radius: 20px;
    margin: 5px;
    padding: 10px;
    display: inline-block;
`;
