import styled from 'styled-components';
import React from 'react';

function LabelError(props : any) {
    return <LabelErrorStyles>{props.innerText}</LabelErrorStyles>;
}

const LabelErrorStyles = styled.label`
    display: block;
    width:100%;
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