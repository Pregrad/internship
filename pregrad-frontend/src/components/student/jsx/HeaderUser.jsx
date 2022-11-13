import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../img/logo.png";
import Logo2 from "../../../img/logo-white.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import "../css/HeaderUserStyles.css";
import {useCookies} from 'react-cookie'
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import axios from "axios"
const HeaderUser = ({theme, setTheme,name}) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    if(theme === "light-theme"){
      setTheme("dark-theme");
    }else{
      setTheme("light-theme");
    }
  }
  const initials = name
  const name_initials=typeof initials==="string" ?initials.split('')[0]:""

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [isLogoutMenu, setIsLogoutMenu] = useState(false);

  const [cookies,setCookies,removeCookie] = useCookies([])

  const LogOut = async()=>{
    console.log(cookies.session)
    removeCookie("jwt")
    navigate('/login')
    window.location.reload(true);

  }

  return (
    <div className="headerUser">
      <div className="left_section_headerUser">
        <Link to="/">
        {theme === "light-theme" && (
            <img src={Logo} alt="pregrad" />
          )}
          {theme === "dark-theme" && (
            <img src={Logo2} alt="pregrad" />
          )}
        </Link>
      </div>

      <div className={click ? "right_section_headerUser active_headerUser" : "right_section_headerUser"}>
        <div className="menu_headerUser">
          <Link to="/" className="intern_headerUser">
            Home
          </Link>

          <div className="theme_icon_container_headerUser" onClick={toggleTheme}>
            {
              theme==="light-theme" ? <BsMoonFill className="theme_icon_headerUser" /> : <BsSunFill className="theme_icon_headerUser" />
            }
          </div>

          <div className="user_details_container_headerUser" onClick={() => setIsLogoutMenu(!isLogoutMenu)}>
            <div className="user_avavtar_headerUser">{name_initials}</div>
            <p>{name}</p>
            { isLogoutMenu ? <RiArrowDropUpLine size={29} className="dropdown_menu_headerUser" /> : <RiArrowDropDownLine size={29} className="dropdown_menu_headerUser" />}
          </div>

          { isLogoutMenu && (
            <div className="logout_container_headerUser">
            <a onClick={LogOut}>Logout <MdLogout /></a>
         </div>
          ) }
        </div>
      </div>

      <div className="hamburger">
          <div className="theme_icon_container2_signup" onClick={toggleTheme}>
            {
              theme==="light-theme" ? <BsMoonFill className="theme_icon2_headerUser" /> : <BsSunFill className="theme_icon2_headerUser" />
            }
          </div>

        {click ? (
          <>
          <div className="user_avavtar_headerUser" onClick={handleClick}>{name_initials}</div>
          <div className="logout_container_headerUser">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
            <a onClick={LogOut}>Logout <MdLogout /></a>
            </div>
         </div>
          </>
        ) : (
            <>
          <div className="user_avavtar_headerUser" onClick={handleClick}>{name_initials}</div>
          
         </>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;
