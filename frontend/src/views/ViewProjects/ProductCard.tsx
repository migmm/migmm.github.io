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
    width:100%;

    @media (min-width: 950px) {
        width:40%;
    }

`;

const CardContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #EBEBEB;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    
    &:hover{
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1em;
`;
