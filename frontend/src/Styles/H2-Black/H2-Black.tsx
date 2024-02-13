import styled from "styled-components";

const H2Black = (props  :any) => {

    return <H2BlackStyled>{props.children}</H2BlackStyled>;
}

const H2BlackStyled = styled.h2`
    font-family: "Work Sans", sans-serif;
    font-weight: 800;
    font-size: 2em;
    color: black;
    margin-bottom: 1em;
    width: 100%;
    text-align: center;
`;

export default H2Black;
