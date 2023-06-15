import styled from 'styled-components';


const Paragraph = styled.p`
    font-family: 'Work Sans', sans-serif;
    font-weight: 500;
    margin: 0.5em 0 0.5em 0;

    a {
        color: #000000;
        text-decoration: none;

        :hover {
            color: #ED1B23;
        }
        :active {
            color: #ED1B23;
        }
    }
`;

export default Paragraph;