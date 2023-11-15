import React from "react";
import styled from "styled-components";


function H2(props : any) {
    return <H1Styles>{props.innerText}</H1Styles>;
}

const H1Styles = styled.h2`
    font-family: 'Work Sans', sans-serif;
    font-weight: 800;
    text-align: center;
    margin: 1.5em 1em 1em 1em;
    height: 56px;
    overflow: hidden;
`;


export default H2;