import styled from "styled-components";


function BalloonSmall(props : any) {
    return <BalloonStyles>{props.innerText}</BalloonStyles>;
}


const BalloonStyles = styled.div`
    font-family: 'Work Sans', sans-serif;
    font-size: 12px;    
    background-color: #0069C5;
    color: #fff;
    border-radius: 20px;
    margin: 5px;
    padding: 10px;
    height: 33px;
    display: inline-block;

    :hover {
        background-color: #004a8b;
    }

    :active {
        background-color: #0088ff;
    }
`;

export default BalloonSmall;