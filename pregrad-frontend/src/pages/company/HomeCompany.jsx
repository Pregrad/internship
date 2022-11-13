import React from 'react'
import HeaderCompany from '../../components/company/jsx/HeaderCompany';
import HomeBanner1 from '../../components/student/jsx/HomeBanner1';
import Footer from '../../components/student/jsx/Footer';
import HomeBanner2 from '../../components/student/jsx/HomeBanner2';
import HomeBanner3 from '../../components/student/jsx/HomeBanner3';
import HomeBanner4 from '../../components/student/jsx/HomeBanner4';
import SliderCompanies from '../../components/student/jsx/SliderCompanies';

const Home = ({theme, setTheme}) => {
  return (
    <div>
      <HeaderCompany theme={theme} setTheme={setTheme} />
      <HomeBanner1 />
      <SliderCompanies />
      <HomeBanner4 />
      <HomeBanner3 />
      <HomeBanner2 />
      <Footer />
    </div>
  )
}

export default Home
