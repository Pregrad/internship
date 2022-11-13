import React from 'react';
import "../css/HomeBanner3Styles.css";
import Spiral1 from "../../../img/home-banner/spiral1.svg";
import Spiral2 from "../../../img/home-banner/spiral2.svg";
import { Link } from 'react-router-dom';

const HomeBanner3 = () => {
  return (
    <div>
      <div className='main_container_homebanner3'>
        <div className='main_top_section_homebanner3'>
            <h3>Start applying for companies NOW</h3>
            <Link to="/signup">Sign up for a free account</Link>
            <button className='btn_homebanner3'>Get Started</button>
        </div>

        <div className='main_bottom_section_homebanner3'>
            <img src={Spiral2} alt='spiral-left' className='spiral_left_homebanner3' />

            <img src={Spiral1} alt='spiral-left' className='spiral_right_homebanner3' />
        </div>
      </div>
    </div>
  )
}

export default HomeBanner3
