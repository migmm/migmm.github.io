import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ projectName, id, imageUrl, userRole }: any) => {
    /*  const isAdmin = userRole === 'admin'; */

    return (
        <CardLink to={`/viewproject/${id}`}>
            <CardContainer className="card">
                {/* {isAdmin && ( */}
                <CardButtons>
                    <Link to={`/edit/${id}`}>
                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                    </Link>
                    <Link to={`/delete/${id}`}>
                        <FontAwesomeIcon icon={faTimes} size="2x"/>
                    </Link>
                </CardButtons>
                {/*    )} */}
                <CardImage src={imageUrl} alt={projectName} />
            </CardContainer>
        </CardLink>
    );
};

export default ProductCard;

const CardLink = styled(Link)`
    text-decoration: none;
    color: black;
    width: 100%;

    @media (min-width: 950px) {
        width: 100%;
    }
`;

const CardContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ebebeb;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;

    &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;

const CardButtons = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    a {
        color: black;
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1em;
`;
