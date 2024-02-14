import styled from 'styled-components';
import H2Black from '../../Styles/H2-Black/H2-Black';
import Paragraph from '../../Styles/Paragraph/Paragraph';


const ShortInfoSection = () => {
    return (
        <ShortInfo>
            <H2Black>About Me</H2Black>
            <Paragraph
                innerText='I have practical experience in languajes and technologies like PHP, JAVA, Javascript/Typescript and Node.JS with 
        MongoDB and PostgreSQL and a working knowledge of React. All of this combined with a creative and innovative mindset.'
            />
            <Paragraph
                innerText='With a flexible and goal-oriented approach, I can tackle complex challenges and develop innovative 
        solutions, adapting to diverse project environments and requirements.'
            />
        </ShortInfo>
    );
};

export default ShortInfoSection;


const ShortInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #000000;
    padding: 5em 3em;

    p {
        max-width: 900px;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.5em;
        }
    }
`;
