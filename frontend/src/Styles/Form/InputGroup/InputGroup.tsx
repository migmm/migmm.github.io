import styled from "styled-components";

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    :last-child {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
`