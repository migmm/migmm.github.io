import React from "react";
import styled from "styled-components";

const CertificateCard = ({ courseTitle, courseImage, urlCheck }: any) => {
    return (
        <CertificateCardStyles>
        <a href={urlCheck}>
            <div className="card">
                <div className="images-container">
                    <img src={courseImage} alt="" />
                </div>
                <div className="favicon-container"></div>
                <h2>{courseTitle}</h2>
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