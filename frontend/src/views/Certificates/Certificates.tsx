import React, { useEffect, useState } from "react";
import styled from "styled-components";
import H1 from "../../Styles/H1/H1";
import CertificateCard from "./CertificateCard";
import { apiURL } from '../../config/urls';
import axios from "axios";

interface DataItem {
    certificateName: any;
    id: number;
    projectName: string;
    coverImage: string;
}

const Certificates = () => {

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        // Hacer la solicitud HTTP a la URL deseada
        axios
            .get(`${apiURL}certificate/`)
            .then((response) => {
                setData(response.data);
                console.log('Data fetched successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <CertificatesStyles>
            <div className="certifications-container">
                <H1>Certifications</H1>
                <div className="cards-container">
                {data.map((item) => (
                        <CertificateCard projectName={item.certificateName} imageUrl={item.coverImage} />
                    ))}
                </div>
            </div>
        </CertificatesStyles>
    );
};

export default Certificates;

const CertificatesStyles = styled.main`
    max-width: 1900px;
    margin: 0 auto;

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
