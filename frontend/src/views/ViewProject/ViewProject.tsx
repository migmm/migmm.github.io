import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { apiURL } from '../../config/urls';
import FormattedView from './FormattedView';
import Balloon from '../../components/Balloon/Balloon';
import Button from '../../Styles/Form/Button/Button';

import H1 from '../../Styles/H1/H1';
import Paragraph from '../../Styles/Paragraph/Paragraph';
import { ProjectData, HeroStylesProps, ViewProjectProps } from './interface';
import { useAppUser } from '../../context/UserContext';

const ViewProject: React.FC<ViewProjectProps> = ({ user }) => {
    const { projectId } = useParams<{ projectId: string }>();
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const { role } = useAppUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}projects/${projectId}`);
                const data = response.data;
                setProjectData(data);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        if (projectId) {
            fetchData();
        }
    }, [projectId]);

    const BalloonContainer = ({ tags }: any) => {
        const words: string[] = tags.split(',').map((tag: string) => tag.trim());

        const balloons = words.map((word: any, index: any) => (
            <Link to={`/search/${word}`}>
                <Balloon key={index} className="balloon" innerText={word} />
            </Link>
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
                {projectData ? (
                    <>
                        <ActualRoute>
                            <Link to="/">
                                {' '}
                                <FontAwesomeIcon icon={faHome} />
                            </Link>{' '}
                            / <Link to="/projects">Projects</Link> / {projectData.projectName}
                        </ActualRoute>
                        <HeroStyles bg={projectData.coverImage}>
                            <HeroLeft>
                                {' '}
                                <MyComponent htmlContent={projectData.headerTitle} />{' '}
                            </HeroLeft>
                            <HeroRight>
                                <img src={projectData.coverImage} alt="Logo" />
                            </HeroRight>
                        </HeroStyles>
                        {role === 'admin' && (
                            <EditProject>
                                <Link to={`/editproject/${projectData.id}`}>
                                    <Button innerText='Edit'/>
                                </Link>
                            </EditProject>
                        )}
                        <Content>
                            <div className="information">
                                <H1 innerText={projectData.projectName} />
                                <Paragraph innerText={`Category: ${projectData.category}`} />
                                <Paragraph innerText={`Project Status: ${projectData.projectStatus}`} />
                                <Paragraph innerText={`Git URL: <a href="${projectData.gitURL}">${projectData.gitURL}</a>`} />
                                {projectData.deployURL && <Paragraph innerText={
                                    `Deploy URL: <a href="${projectData.deployURL}">${projectData.deployURL}</a>`} />}
                                <Paragraph innerText={`Last update: ${projectData.lastUpdate}`} />
                                <BalloonContainer tags={projectData.tags} />
                            </div>
                            <FormattedView content={projectData.editorHtml} />
                        </Content>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
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

const EditProject = styled.div`
    text-align: right;
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
