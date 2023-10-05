import React, { useEffect, useState } from "react";
import styled from "styled-components";
import H1 from "../../Styles/H1/H1";
import CertificateCard from "./CertificateCard";
import { apiURL } from '../../config/urls';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";

interface DataItem {
    courseTitle: any;
    id: number;
    courseImage: string;
    urlCheck: string;
}

interface HeroStylesProps {
    bg: string;
}

const Certificates = () => {

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        axios
            .get(`${apiURL}certifications/`)
            .then((response) => {
                setData(response.data);
                console.log('Data fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <CertificatesViewContainer>
            <ActualRoute>
                <Link to='/'>
                    {' '}
                    <FontAwesomeIcon icon={faHome} />
                </Link>{' '}
                / <Link to='/certificates'>Certificates</Link>
                {''}
            </ActualRoute>
            <HeroStyles bg={'img/certificates-title.png'}>
                <HeroLeft>{'My best certifications.'}</HeroLeft>
                <HeroRight>
                    {' '}
                </HeroRight>
            </HeroStyles>
            <div className="certifications-container">
                <H1>Certifications</H1>
                <div className="cards-container">
                {data.map((item) => (
                    <CertificateCard key={item.id} courseTitle={item.courseTitle} courseImage={item.courseImage} urlCheck={item.urlCheck}/>
))}
                </div>
            </div>
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

    .certifications-container {
        margin: 1em;

        .selectors-container {
            text-align: center;
            font-family: "Work Sans", sans-serif;
            font-weight: 600;
            margin-bottom: 1em;
            font-size: 1.3em;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 0.5em;

            .select-company,
            .select-category {
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                border: none;
                font-size: 1em;
                cursor: pointer;
            }

            .select-company:hover,
            .select-category:hover {
                color: grey;
            }
        }

        .cards-container {
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

            .card {
                width: 100%;
                height: 200px;
                margin-bottom: 4em;

                @media (min-width: 768px) {
                    max-width: 300px;
                }

                .images-container {
                    // background-color: #0069c5;
                    height: 200px;
                    //border-radius: 30px;
                    position:relative;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        border-radius: 30px;

                        :nth-child(2) {
                            position: absolute;
                            top: 50px;
                            left: 50px;
                            width: 40px;
                        }
                    }
                }

                h2 {
                    font-family: "Work Sans", sans-serif;
                    font-weight: 700;
                    margin-top: 0.5em;
                    margin-left: 1em;
                }
            }
        }

        .pagination-container {
            text-align: center;
            font-family: "Work Sans", sans-serif;
            font-weight: 600;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 0.5em;
            margin-bottom: 1em;
            font-size: 1.3em;

            select {
                display: none;
                border: none;
                font-family: "Work Sans", sans-serif;
                font-weight: 600;
                font-size: 1em;
            }
        }
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

