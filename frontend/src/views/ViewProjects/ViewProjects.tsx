import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { apiURL } from '../../config/urls';
import {DataItem, HeroStylesProps } from './Interface'
import ProductCard from './ProductCard';
import ProjectTitle from '../../assets/images/projects-title.png';
import Button from '../../Styles/Form/Button/Button';
import { useAppUser } from '../../context/UserContext';
import Preloader from '../../components/Preloader/Preloader';


const ViewProject = () => {
    const { tag } :any= useParams<{ projectId: string }>();
    const [data, setData] = useState<DataItem[]>([]);
    const { role } = useAppUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let apiUrl = `${apiURL}projects/`;

        if (tag) {
            apiUrl = `${apiURL}projects/search?tags=${tag}`;
        }

        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data);
                console.log('Data fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [tag]);


    return (
        <ProjectsViewContainer>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
            <ActualRoute>
                <Link to='/'>
                    {' '}
                    <FontAwesomeIcon icon={faHome} />
                </Link>{' '}
                / <Link to='/projects'>Projects</Link>
                {''}
            </ActualRoute>
            <HeroStyles bg={ProjectTitle}>
                <HeroLeft>{'Explore my projects and creative work.'}</HeroLeft>
                <HeroRight>
                    {' '}
                </HeroRight>
            </HeroStyles>
            {role === 'admin' && (
                <AddProject>
                    <Link to='/addproject'>
                        <Button innerText='Add new project'/>
                    </Link>
                </AddProject>
            )}
            <Content>
                <CardContainer>
                    {data.map((item) => (
                        <ProductCard
                        key={item.id}
                        id={item.id}
                        projectName={item.projectName}
                        imageUrl={item.coverImage}
                        tags={item.tags} // Suponiendo que `item.tags` es un array de strings
                    />
                    ))}
                </CardContainer>
            </Content>
            </>
            )}
        </ProjectsViewContainer>
    );
};

export default ViewProject;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1em;

    @media (min-width: 950px) {
        flex-direction: row;
    }
`;

const ProjectsViewContainer = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    padding: 1em;
    margin-bottom: 6em;

    @media (min-width: 768px) {
        max-width: 1500px;
    }
`;

const AddProject = styled.div`
    text-align: right;
    margin-top: 2em;
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
    box-shadow: -1px 12px 6px -9px rgba(0,0,0,0.75);

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
    margin-top: 2em;

    .information {
        align-self: flex-start;
    }

    @media (min-width: 950px) {
        flex-direction: row;
    }
`;