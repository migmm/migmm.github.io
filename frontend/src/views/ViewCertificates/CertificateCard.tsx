import React from 'react';
import styled from 'styled-components';
import H2 from '../../Styles/H2/H2';

const CertificateCard = ({ courseTitle, courseImage, urlCheck }: any) => {
    return (
        <CertificateCardStyles>
            <a href={urlCheck} target="_blank" rel="noopener noreferrer">
                <div className="card">
                    <div className="images-container">
                        <img src={courseImage} alt="" />
                    </div>
                    <div className="favicon-container"></div>
                    <H2 innerText={courseTitle} />
                </div>
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
