import React from 'react'
import Footer from '../../components/student/jsx/Footer';
import Header from '../../components/student/jsx/Header';
import HomeBanner1 from '../../components/student/jsx/HomeBanner1';
import HomeBanner2 from '../../components/student/jsx/HomeBanner2';
import HomeBanner3 from '../../components/student/jsx/HomeBanner3';
import HomeBanner4 from '../../components/student/jsx/HomeBanner4';
import HomeBanner5 from '../../components/student/jsx/HomeBanner5';
import HomeBanner6 from '../../components/student/jsx/HomeBanner6';
import SliderCompanies from '../../components/student/jsx/SliderCompanies';



const Home = ({theme, setTheme}) => {


  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <HomeBanner1 />
      <HomeBanner6 />
      <SliderCompanies />
      <HomeBanner5 />
      <HomeBanner2 />
      <HomeBanner3 />
      <HomeBanner4 />
      <Footer />
    </div>
  )
}

export default Home;
