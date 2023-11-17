import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import H1 from '../../Styles/H1/H1';
import CertificateCard from './CertificateCard';
import { apiURL } from '../../config/urls';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import CertificateTitle from '../../assets/images/certificates-title.png';
import { DataItem, HeroStylesProps, CertificateData } from './interface';

const Certificates = () => {
    const [certifications, setCertifications] = useState<DataItem[]>([]);
    const [badges, setBadges] = useState<DataItem[]>([]);

    useEffect(() => {
        axios
            .get(`${apiURL}certifications/`)
            .then((response) => {
                const sortedData = response.data.sort((a: any, b: any) => {
                    const dateA: any = new Date(a.issueDate);
                    const dateB: any = new Date(b.issueDate);
                    return dateA - dateB;
                });

                const certificationsData = sortedData.filter((item: CertificateData) => item.type === 'certification');
                const badgesData = sortedData.filter((item: CertificateData) => item.type === 'badge');

                setCertifications(certificationsData);
                setBadges(badgesData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <CertificatesViewContainer>
            <ActualRoute>
                <Link to="/">
                    {' '}
                    <FontAwesomeIcon icon={faHome} />
                </Link>{' '}
                / <Link to="/certificates">Certificates</Link>
                {''}
            </ActualRoute>
            <HeroStyles bg={CertificateTitle}>
                <HeroLeft>{'My best certifications.'}</HeroLeft>
                <HeroRight> </HeroRight>
            </HeroStyles>
            <CertificationsContainer>
                {/* Certifications */}
                {certifications.length > 0 && (
                    <>
                        <H1 innerText="Certifications" />
                        <CardsContainer>
                            {certifications.map((item) => (
                                <CertificateCard
                                    key={item.id}
                                    courseTitle={item.courseTitle}
                                    courseImage={item.courseImage[0]}
                                    urlCheck={item.urlCheck}
                                />
                            ))}
                        </CardsContainer>
                    </>
                )}

                {/* Badges */}
                {badges.length > 0 && (
                    <>
                        <H1 innerText="Badges" />
                        <CardsContainer>
                            {badges.map((item) => (
                                <CertificateCard
                                    key={item.id}
                                    courseTitle={item.courseTitle}
                                    courseImage={item.courseImage[0]}
                                    urlCheck={item.urlCheck}
                                />
                            ))}
                        </CardsContainer>
                    </>
                )}
            </CertificationsContainer>
        </CertificatesViewContainer>
    );
};

export default Certificates;

const CertificatesViewContainer = styled.main`
    max-width: 1900px;
    margin: 0 auto;
    padding: 1em;

    @media (min-width: 768px) {
        max-width: 1500px;
    }
`;

const HeroStyles = styled.div<HeroStylesProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: unset;
    position: relative;
    box-shadow: -1px 12px 6px -9px rgba(0, 0, 0, 0.75);

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

const CertificationsContainer = styled.div`
    margin: 1em;
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
        justify-content: center;
    }

    
`;
