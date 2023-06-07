import styled from 'styled-components';


const Button = styled.button`
    border-radius: 20px;
    padding: 1em;
    border: 1px solid #ebebeb;
    background-color: #0069c5;
    color: #ffffff;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
    text-align: center;
    font-size: 1em;
    width: 50%;
    cursor: pointer;

    @media (min-width: 768px) {
        max-width: 300px;
    }

    :hover {
        background-color: #004a8b;
    }

    :active {
        background-color: #0088ff;
    }
`;

export default Button;