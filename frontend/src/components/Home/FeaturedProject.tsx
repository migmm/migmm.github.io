
import styled from 'styled-components';

import Paragraph from '../../Styles/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import Balloon from '../Balloon/Balloon';
import H2Black from '../../Styles/H2-Black/H2-Black';


const FeaturedProject = () => {
    return (
        <ProjectContainer>
            <H2Black> Featured project</H2Black>

            {/*                 <p>Featured projects that I've developed</p> */}

            <CardsContainer>
                <BigCardContainer>
                    <BigCard>
                        <CardLeftPart>
                            <CardImageContainer>
                                <Link to='/viewproject/6516025d1b4919237b91f9af'>
                                    <IMG src='img/cosmica-screens.png' alt='Project preview' />
                                </Link>
                            </CardImageContainer>
                        </CardLeftPart>
                        <CardRightPart>
                            <CardTitleContainer>
                                <H2Black>Juguetería Cósmica</H2Black>
                            </CardTitleContainer>
                            <CardInfoContainer>
                                <Paragraph
                                    innerText='E-commerce project using several technologies and design patterns. In the frontend I used HTML, CSS and
                            Javascript and in the backend I used Node.js, Express and MongoDB.'
                                />
                            </CardInfoContainer>
                            <CardLanguagesContainer>
                                <Link to='/search/HTML'>
                                    <Balloon innerText='HTML' />
                                </Link>
                                <Link to='/search/CSS'>
                                    <Balloon innerText='CSS' />
                                </Link>
                                <Link to='/search/Javascript'>
                                    <Balloon innerText='Javascript' />
                                </Link>
                                <Link to='/search/NodeJS'>
                                    <Balloon innerText='NodeJS' />
                                </Link>
                                <Link to='/search/MongoDB'>
                                    <Balloon innerText='MongoDB' />
                                </Link>
                            </CardLanguagesContainer>
                        </CardRightPart>
                    </BigCard>
                </BigCardContainer>
            </CardsContainer>

            <ViewMoreContainer>
                <Link to='/projects'>View more projects</Link>
            </ViewMoreContainer>
        </ProjectContainer>
    );
};


export default FeaturedProject;

const ProjectContainer = styled.div`
    padding: 5em 3em;
    padding-bottom: 10em;
    align-items: center;
    background-color: #ffffff;
`;
const CardsContainer = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    gap: 1em;
`;

const BigCardContainer = styled.div`
    width: 65%;
`;

const CardLanguagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ViewMoreContainer = styled.div`
    width: 100%;
    float: right;
    text-align: right;
    width: 100%;
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    margin: 0.5em 0 0.5em 0;

    a {
        color: black;
        text-decoration: none;

        :hover {
            color: #b6b4b4;
        }
    }
`;

const CardInfoContainer = styled.div``;

const IMG = styled.img`
    width: 100%;
`;

const CardLeftPart = styled.div``;

const BigCard = styled.div``;

const CardTitleContainer = styled.div``;

const CardImageContainer = styled.div``;

const CardRightPart = styled.div``;
