import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../../img/logo.png";
import Logo2 from "../../../img/logo-white.png";
import { FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { CgMenuRight } from "react-icons/cg"
import { FaRegUser } from "react-icons/fa"
import "../../student/css/HeaderStudentStyles.css";
import {useCookies} from 'react-cookie'
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios"

const Header2Company = (props) => {

    const toggleTheme = () => {
        if(props.theme === "light-theme"){
          props.setTheme("dark-theme");
        }else{
          props.setTheme("light-theme");
        }
      }
    
      const initials = props.name

      const name_initials=typeof initials==="string" ?initials.split('')[0]:""
    
      const [click, setClick] = useState(false);
      const handleClick = () => setClick(!click);
      const [isLogoutMenu, setIsLogoutMenu] = useState(false);
    
    const navigate = useNavigate()
    
      const [cookies,setCookies,removeCookie] = useCookies([])
    
      const LogOut = async()=>{
         removeCookie("jwt")
         navigate('/login')
         window.location.reload(true);
      }
    
      return (
        <div className="headerStudent">
          <div className="left_section_headerStudent">
            {window.innerWidth < 940 ? (<CgMenuRight size={30} className="left_section_icon_headerStudent" onClick={() => props.setIsOpenSidebar(!props.isOpenSidebar)} />
    ) : ""}
            {!props.isOpenSidebar && (
              <Link to="/">
              {props.theme === "light-theme" && (
                <img src={Logo} alt="pregrad" />
              )}
              {props.theme === "dark-theme" && (
                <img src={Logo2} alt="pregrad" />
              )}
            </Link>
            )}
          </div>
    
          <div className={click ? "right_section_headerStudent active" : "right_section_headerStudent"}>
            <div className="menu_headerStudent">
              <Link to="/" className="intern_headerStudent">
                Home
              </Link>
    
              <div className="theme_icon_container_headerStudent" onClick={toggleTheme}>
                {
                  props.theme==="light-theme" ? <BsMoonFill className="theme_icon_headerStudent" /> : <BsSunFill className="theme_icon_headerStudent" />
                }
              </div>
    
              <div className="user_details_container_headerStudent" onClick={() => setIsLogoutMenu(!isLogoutMenu)}>
                <div className="user_avavtar_headerStudent">{name_initials}</div>
                <p>{props.name}</p>
                { isLogoutMenu ? <RiArrowDropUpLine size={29} className="user_avatar_logo_headerStudent" /> : <RiArrowDropDownLine size={29} className="user_avatar_logo_headerStudent" />}
              </div>
    
              { isLogoutMenu && (
                <div className="logout_container_headerStudent">
                  <div className="logout_items_headerStudent">
                    <a onClick={LogOut}>Logout <div> <MdLogout /></div></a>
                  </div>
             </div>
              ) }
            </div>
          </div>
    
          <div className="hamburger">
              <div className="theme_icon_container2_headerStudent" onClick={toggleTheme}>
                {
                  props.theme==="light-theme" ? <BsMoonFill className="theme_icon2_headerStudent" /> : <BsSunFill className="theme_icon2_headerStudent" />
                }
              </div>
    
            {click ? (
              <>
              <div className="user_avavtar_headerStudent" onClick={handleClick}>{name_initials}</div>
              <div className="logout_container_headerStudent">
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
              <div className="user_avavtar_headerStudent" onClick={handleClick}>{name_initials}</div>
              
             </>
            )}
          </div>
        </div>
      )
    }

export default Header2Company
