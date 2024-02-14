import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import { setupScrollHandler } from './scrollHandler';

import FeaturedProject from '../../components/Home/FeaturedProject';
import SkillsSection from '../../components/Home/Skills';
import ShortInfoSection from '../../components/Home/ShortInfo';


const Home = ({ homeData }: any) => {
    const contactIcons = useRef(null);
    const zoomElement = useRef(null);
    const heroContainerFixed = useRef(null);

    const data = homeData[0];

    useEffect(() => {
        if (!isMobile) {
            console.log('you are not on mobile');
            const cleanupScrollHandler = setupScrollHandler(contactIcons.current, zoomElement.current || zoomElement, heroContainerFixed.current);
            return () => {
                cleanupScrollHandler();
            };
        }
    }, []);

    return (
        <HomeContainer>
            <HeroHeightReserver>
                <HeroContainer ref={heroContainerFixed}>
                    <TextContainer>
                        <TextHome ref={zoomElement}>
                            Hi everyone!
                            <br /> My name is {data.name}.
                            <br /> I'm a <span className='charge-text'>{data.jobTitle}</span>,
                            <br /> from {data.location}.
                        </TextHome>
                    </TextContainer>
                    <ContactIcons ref={contactIcons}>
                        <a href={data.githubURL} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-github fa-3x'></i>
                        </a>
                        <a href={data.linkedinURL} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-linkedin fa-3x'></i>
                        </a>
                        <a href={`mailto:${data.email}`} target='_blank' rel='noreferrer'>
                            <i className='fa fa-envelope fa-3x'></i>
                        </a>
                        <a href={`https://api.whatsapp.com/send?phone=${data.whatsappNumber}`} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-whatsapp fa-3x'></i>
                        </a>
                        <a href={`https://t.me/${data.telegramId}`} target='_blank' rel='noreferrer'>
                            <i className='fa-brands fa-telegram fa-3x'></i>
                        </a>
                    </ContactIcons>
                </HeroContainer>
            </HeroHeightReserver>
            <ShortInfoSection />
            <SkillsSection />
            <FeaturedProject/>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.main`
    margin: 0 0 0 0;
`;

const HeroHeightReserver = styled.div`
    height: calc(100vh - 8.5em);
`;

const HeroContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        justify-content: center;
        margin-top: unset;
    }
`;

const TextContainer = styled.div`
    max-width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1em;
    padding-bottom: 3em;
    margin: 0 auto;
`;

const TextHome = styled.p`
    text-align: center;
    font-size: 6vw;
    font-family: 'Work Sans', sans-serif;
    display: block;
    font-weight: 800;
    //word-spacing: -10px;
    opacity: 1;
    transition: transform 330ms ease-in-out, opacity 0.2s ease;
`;

const ContactIcons = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex: row;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s;

    @media (min-width: 900px) {
        .fa-3x {
            font-size: 4.5em;
        }
    }

    a {
        width: 50px;
        height: 50px;
        color: black;
        margin: 0.2em;

        @media (min-width: 900px) {
            margin: 1.5em;
        }

        @media (hover: hover) {
            :hover {
                color: #ed1b23;
            }
        }

        :active {
            color: #ff0000;
        }
    }
`;
