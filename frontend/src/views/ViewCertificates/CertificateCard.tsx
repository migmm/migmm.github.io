import React from 'react';
import styled from 'styled-components';
import H2 from '../../Styles/H2/H2';

const CertificateCard = ({ courseTitle, courseImage, urlCheck }: any) => {
    return (
        <CertificateCardStyles>
            <a href={urlCheck} target="_blank" rel="noopener noreferrer">
                <Card>
                    <ImagesContainer>
                        <img src={courseImage} alt="" />
                    </ImagesContainer>
                    <div className="favicon-container"></div>
                    <H2 innerText={courseTitle} />
                </Card>
            </a>
        </CertificateCardStyles>
    );
};

export default CertificateCard;

const CertificateCardStyles = styled.div`
    a {
        text-decoration: none;
        color: black;
    }
`;

const Card = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 8em;

    @media (min-width: 768px) {
        max-width: 300px;
    }
`;

const ImagesContainer = styled.div`
        height: 200px;
        position: relative;

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
`;