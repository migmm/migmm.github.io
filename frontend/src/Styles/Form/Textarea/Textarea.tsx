import styled from 'styled-components';


const Textarea = styled.textarea`
    width:100%;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    text-align: center;
    font-size: 1em;
    margin-bottom: 1em;
    border-radius: 20px;
    padding: 0.5em;
    border: 1px solid #ebebeb;
    resize: vertical;
    height: 10em;

    :focus {
        background-color: #e2e2e2;
    }
`;

export default Textarea;