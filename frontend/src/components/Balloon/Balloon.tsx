import React from "react";
import styled from "styled-components";


function Balloon(props : any) {
    return <BalloonStyles>{props.innerText}</BalloonStyles>;
}


const BalloonStyles = styled.div`
    font-family: 'Work Sans', sans-serif;
    background-color: #0069C5;
    color: #fff;
    border-radius: 20px;
    margin: 5px;
    padding: 10px;
    display: inline-block;

    :hover {
        background-color: #004a8b;
    }

    :active {
        background-color: #0088ff;
    }
`;

export default Balloon;