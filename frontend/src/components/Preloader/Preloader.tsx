import styled, { keyframes } from 'styled-components';

import logo from '../../assets/images/logo.png';

const Preloader = () => {
    return (
        <PreloaderContainer>
            <Logo />
        </PreloaderContainer>
    );
};

export default Preloader;

const PreloaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const pinchAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
`;

const punchAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1);
    }
`;

const Logo = styled.div`
    width: 150px;
    height: 150px;
    background-image: url(${logo});
    background-size: cover;
    animation: ${pinchAnimation} 0.5s ease-in-out alternate infinite, ${punchAnimation} 0.5s ease-in-out alternate infinite;
`;
