import styled from 'styled-components';


const LabelError = styled.label`
    display: block;
    font-family: 'Work Sans', sans-serif;
    color: #ff0000;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1em;

    &::after {
        content: " ";
        display: inline-block;
        height: 0;
        visibility: hidden;
    }
`;

export default LabelError;