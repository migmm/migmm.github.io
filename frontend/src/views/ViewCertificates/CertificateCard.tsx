import React from 'react';
import styled from 'styled-components';
import H2 from '../../Styles/H2/H2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const CertificateCard = ({ courseTitle, courseImage, urlCheck, id }: any) => {
    const { role } = useAppUser();

    return (
        <CertificateCardStyles>
            {role === 'admin' && (
                <CardButtons>
                    <Link to={`/editproject/${id}`}>
                        <FontAwesomeIcon icon={faEdit} size="2x" />
                    </Link>
                    <Link to={`/delete/certifications/${id}`}>
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </Link>
                </CardButtons>
            )}
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
position: relative;
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

const CardButtons = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    z-index: 1000;

    a {
        color: black;
    }
`;
