import React from "react";
import styled from "styled-components";

function H1(props : any) {
    return <H1Style>{props.innerText}</H1Style>;
}

const H1Style = styled.h1`
    font-family: 'Work Sans', sans-serif;
    font-weight: 800;
    text-align: center;
    margin: 1.5em 1em 1em 1em;
`;

export default H1;