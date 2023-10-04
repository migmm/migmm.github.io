import React from "react";

const CertificateCard = ({ courseTitle, courseImage, urlCheck }: any) => {
    return (
        <a href={urlCheck}>
            <div className="card">
                <div className="images-container">
                    <img src={courseImage} alt="" />
                </div>
                <div className="favicon-container"></div>
                <h2>{courseTitle}</h2>
            </div>
        </a>
    );
};

export default CertificateCard;
