import React from "react";

const CertificateCard =  ({ certificateName, coverImage }: any) => {
    return (
        <div className="card">
            <div className="images-container">
                <img src={coverImage} alt="" />
                <img src="img/example-favicon.png" alt="" />
            </div>
            <div className="favicon-container"></div>
            <h2>{certificateName}</h2>
        </div>
    );
};

export default CertificateCard;
