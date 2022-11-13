import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/HeaderAuthStyles.css";
import Logo from "../../../img/logo.png";
import Logo2 from "../../../img/logo-white.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const HeaderAuth = ({theme, setTheme}) => {

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div>
      <div className="header_headerauth">
        <div className="left_section_headerauth">
          <Link to="/">
          {theme === "light-theme" && <img src={Logo} alt="pregrad" />}
          {theme === "dark-theme" && <img src={Logo2} alt="pregrad" />}
          </Link>
          <Link to="/" className="intern_headerauth">
            Contact
          </Link>
        </div>

        <div
          className={
            click ? "right_section_headerauth active_headerauth" : "right_section_headerauth"
          }
        >
          <div className="abc_headerauth">
            <Link to="/" className="intern2_headerauth">
              Contact
            </Link>
          </div>
          <div className="theme_icon_container_headerauth" onClick={toggleTheme}>
            {theme === "light-theme" ? (
              <BsMoonFill className="theme_icon_headerauth" />
            ) : (
              <BsSunFill className="theme_icon_headerauth" />
            )}
          </div>
        </div>

        <div className="hamburger_headerauth">
          <div className="theme_icon_container2_headerauth" onClick={toggleTheme}>
            {theme === "light-theme" ? (
              <BsMoonFill className="theme_icon2_headerauth" />
            ) : (
              <BsSunFill className="theme_icon2_headerauth" />
            )}
          </div>
          {click ? (
            <FaTimes
              size={20}
              className="hamburger_icon_headerauth"
              onClick={handleClick}
            />
          ) : (
            <FaBars
              size={20}
              className="hamburger_icon_headerauth"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderAuth;
