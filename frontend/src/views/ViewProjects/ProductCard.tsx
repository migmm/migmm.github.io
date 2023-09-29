import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const ProductCard = ({ projectName, id, imageUrl }: any) => {
    return (
        <CardLink to={`/viewproject/${id}`}>
            <CardContainer className='card'>
                <CardImage src={imageUrl} alt={projectName} />
            </CardContainer>
        </CardLink>
    );
};

export default ProductCard;

const CardLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const CardContainer = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const CardImage = styled.img`
    max-width: 100%;
    height: auto;
    margin: auto;
    padding: 1em;
`;
