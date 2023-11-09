import React from "react";
import styled from "styled-components";


function Balloon(props : any) {
    return <BalloonStyles>{props.innerText}</BalloonStyles>;
}


const BalloonStyles = styled.div`
    font-family: 'Work Sans', sans-serif;
    background-color: #3498db;
    color: #fff;
    border-radius: 20px;
    margin: 5px;
    padding: 10px;
    display: inline-block;
`;

export default Balloon;