import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../img/logo.png";
import Logo2 from "../../../img/logo-white.png";
import "../../student/css/HeaderStyles.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const Header = ({theme, setTheme}) => {

  const navigate = useNavigate();



  const toggleTheme = () => {
    if(theme === "light-theme"){
      setTheme("dark-theme");
    }else{
      setTheme("light-theme");
    }
  }

  const [click,setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [shadow,setShadow] = useState(false);
    const changeShadow = () => {
      if(window.scrollY >= 100){
        setShadow(true)
      }else{
        setShadow(false)
      }
    }

    window.addEventListener('scroll', changeShadow);

  return (
    <div className={shadow ? "header_header header_shadow_header" : "header_header"}>
      <div className="left_section_header">
          <Link to="/company">
          {theme === "light-theme" && (
            <img src={Logo} alt="pregrad" />
          )}
          {theme === "dark-theme" && (
            <img src={Logo2} alt="pregrad" />
          )}
          </Link>
        <Link to="/company" className="intern_header">Top Internships</Link>
      </div>

      <div className={click ? "right_section_header active_header" : "right_section_header"}>
        <div className="abc">
          <Link to="/company" className="intern2_header">Top Internships</Link>
        </div>
        <Link to="/">Are you a Student ?</Link>
        <div className="button_container_header">
          <button onClick={() => navigate("/login")} className="btn_light_header">Log in</button>
          <button onClick={() => navigate("/company/signup")} className="btn_primary_header">Sign Up</button>
          <div className="theme_icon_container_header" onClick={toggleTheme}>
            {
              theme==="light-theme" ? <BsMoonFill className="theme_icon_header" /> : <BsSunFill className="theme_icon_header" />
            }
          </div>
        </div>
      </div>

      <div className="hamburger_header">
          <div className="theme_icon_container2_header" onClick={toggleTheme}>
            {
              theme==="light-theme" ? <BsMoonFill className="theme_icon2_header" /> : <BsSunFill className="theme_icon2_header" />
            }
          </div>
          {click ? (<FaTimes size={20} className="hamburger_icon_header" onClick={handleClick} />) :
          (<FaBars size={20}  className="hamburger_icon_header"  onClick={handleClick} />)}
      </div>
    </div>
  );
};

export default Header;
