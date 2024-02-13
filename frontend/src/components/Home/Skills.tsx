import styled from "styled-components";
import H2 from "../../Styles/H2/H2";

import htmlLogo from "../../assets/icons/html5.svg";
import cssLogo from "../../assets/icons/css3.svg";
import javascriptLogo from "../../assets/icons/javascript.svg";
import typescriptLogo from "../../assets/icons/typescript.svg";
import reactLogo from "../../assets/icons/react.svg";
import nodeLogo from "../../assets/icons/nodejs.svg";
import expressLogo from "../../assets/icons/express.svg";
import javaLogo from "../../assets/icons/java.svg";
import springLogo from "../../assets/icons/springboot.svg";
import mongoLogo from "../../assets/icons/mongodb.svg";
import mysqlLogo from "../../assets/icons/mysql.svg";
import postgresLogo from "../../assets/icons/postgresql.svg";
import phpLogo from "../../assets/icons/php.svg";

const SkillsSection = () => {
  return (
<Skills>
                <H2>My weapon of choice</H2>
                <IMGContainer>
                    <img src={htmlLogo} alt="HTML logo" />
                    <img src={cssLogo} alt="CSS logo" />
                    <img src={javascriptLogo} alt="Javascript logo" />
                    <img src={typescriptLogo} alt="Typescript logo" />
                    <img src={reactLogo} alt="ReactJS logo" />
                    <img src={nodeLogo} alt="NodeJS logo" />
                    <img src={expressLogo} alt="Express logo" />
                    <img src={javaLogo} alt="JAVA logo" />
                    <img src={springLogo} alt="SpringBoot logo" />
                    <img src={phpLogo} alt="PHP logo" />
                    <img src={mongoLogo} alt="MongoDB logo" />
                    <img src={mysqlLogo} alt="MySQL logo" />
                    <img src={postgresLogo} alt="PostgreSQL logo" />
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
        width: 200px;
    }
`;