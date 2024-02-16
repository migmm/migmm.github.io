import styled from 'styled-components';

import HeroSection from '../../components/Home/HeroSection';
import FeaturedProject from '../../components/Home/FeaturedProject';
import SkillsSection from '../../components/Home/SkillsSection';
import ShortInfoSection from '../../components/Home/ShortInfo';


const Home = ({ homeData }: any) => {
    const data = homeData[0];

    return (
        <HomeContainer>
            <HeroSection data={data} />
            <ShortInfoSection />
            <SkillsSection />
            <FeaturedProject/>
        </HomeContainer>
    );
};

export default Home;


const HomeContainer = styled.main`
    margin: 0 0 0 0;
`;
