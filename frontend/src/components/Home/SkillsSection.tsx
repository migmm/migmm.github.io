import styled from 'styled-components';

import htmlLogo from '../../assets/icons/html5.svg';
import cssLogo from '../../assets/icons/css3.svg';
import javascriptLogo from '../../assets/icons/javascript.svg';
import typescriptLogo from '../../assets/icons/typescript.svg';
import reactLogo from '../../assets/icons/react.svg';
import nodeLogo from '../../assets/icons/nodejs.svg';
import expressLogo from '../../assets/icons/express.svg';
import javaLogo from '../../assets/icons/java.svg';
import springLogo from '../../assets/icons/springboot.svg';
import mongoLogo from '../../assets/icons/mongodb.svg';
import mysqlLogo from '../../assets/icons/mysql.svg';
import postgresLogo from '../../assets/icons/postgresql.svg';
import phpLogo from '../../assets/icons/php.svg';
import H2Black from '../../Styles/H2-Black/H2-Black';

import useImageFadeIn from '../../utils/useImageFadeIn';

const SkillsSection = () => {

    const { imageVisibility, imgRefs } = useImageFadeIn({ imagesNumber: 13, interval: 200 });

    return (
        <Skills>
            <H2Black>My weapon of choice</H2Black>
            <IMGContainer>
            <img ref={(el) => (imgRefs.current[0] = el)} src={htmlLogo} alt='HTML logo' className={imageVisibility[0] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[1] = el)} src={cssLogo} alt='CSS logo' className={imageVisibility[1] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[2] = el)} src={javascriptLogo} alt='Javascript logo' className={imageVisibility[2] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[3] = el)} src={typescriptLogo} alt='Typescript logo' className={imageVisibility[3] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[4] = el)} src={reactLogo} alt='React logo' className={imageVisibility[4] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[5] = el)} src={nodeLogo} alt='Node.js logo' className={imageVisibility[5] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[6] = el)} src={expressLogo} alt='Express logo' className={imageVisibility[6] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[7] = el)} src={javaLogo} alt='Java logo' className={imageVisibility[7] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[8] = el)} src={springLogo} alt='Spring Boot logo' className={imageVisibility[8] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[9] = el)} src={phpLogo} alt='PHP logo' className={imageVisibility[9] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[10] = el)} src={mongoLogo} alt='MongoDB logo' className={imageVisibility[10] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[11] = el)} src={mysqlLogo} alt='MySQL logo' className={imageVisibility[11] ? 'show' : ''} />
                <img ref={(el) => (imgRefs.current[12] = el)} src={postgresLogo} alt='PostgreSQL logo' className={imageVisibility[12] ? 'show' : ''} />
            </IMGContainer>
        </Skills>
    );
};

export default SkillsSection;

const Skills = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #000000;
    padding: 5em 3em;

    p {
        max-width: 900px;
        text-align: center;

        @media (min-width: 768px) {
            font-size: 1.5em;
        }
    }
`;

const IMGContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    margin-top: 2em;
    max-width: 1200px;

    img {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        width: 200px;
    }

    img.show {
        opacity: 1;
    }
`;
