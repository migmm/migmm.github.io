import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppUser } from '../../context/UserContext';
import Paragraph from '../../Styles/Paragraph/Paragraph';
import BalloonSmall from '../../components/BalloonSmall/BalloonSmall';

const ProjectCard = ({ projectName, id, imageUrl, tags }: any) => {
    const { role } = useAppUser();

    const BalloonContainer = ({ tags }: any) => {
        const words: string[] = tags.split(',').map((tag: string) => tag.trim());

        const balloons = words.map((word: any) => (
            <Link key={word} to={`/search/${word}`}>
                <BalloonSmall className="balloon" innerText={word} />
            </Link>
        ));

        return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{balloons}</div>;
    };

    return (
        <CardLink to={`/viewproject/${id}`}>
            <CardContainer className="card">
                {role === 'admin' && (
                    <CardButtons>
                        <Link to={`/editproject/${id}`}>
                            <FontAwesomeIcon icon={faEdit} size="2x" />
                        </Link>
                        <Link to={`/delete/projects/${id}`}>
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </Link>
                    </CardButtons>
                )}
                <CardImage src={imageUrl} alt={projectName} />
        
            </CardContainer>
            <TagsContainer>
                <BalloonContainer tags={tags} />
            </TagsContainer>
        </CardLink>
    );
};

export default ProjectCard;

const CardLink = styled(Link)`
    text-decoration: none;
    color: black;
    width: 100%;
    margin-top: 3em;

    @media (min-width: 950px) {
        width: 400px;
        height: 400px;
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

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5em;
    justify-content: center;
    gap: 0.5em;
`;
