import React from "react";
import styled from "styled-components";


function Label(props : any) {
    return <LabelStyles>{props.innerText}</LabelStyles>;
}


const LabelStyles = styled.label`
    width:100%;
    font-family: "Work Sans", sans-serif;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.5em;
`;

export default Label;
