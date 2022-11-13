import React, {useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../student/css/SidebarStyles.css";
import Logo from "../../../img/logo.png";
import Logo2 from "../../../img/logo-white.png";
import UserImage from "../../../img/user3.png";
import Header2Company from "../../company/jsx/Header2Company";
import { IoIosStats } from "react-icons/io";
import axios from 'axios'
import { TbReportSearch } from "react-icons/tb";
import { NavLink, useNavigate,useParams } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import { MdCastForEducation, MdOutlineVerified } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { RiUserStarLine } from "react-icons/ri";

const SidebarAdmin = ({ children, theme, setTheme }) => {

    const navigate = useNavigate();

    const {id} = useParams()

    const [isOpenSidebar, setIsOpenSidebar] = useState(window.innerWidth > 940 ? true : false);

    const [adminInfo,setAdminInfo] = useState({})

    const routes = [
        {
          path: `/admin/info/${id}/dashboard`,
          name: "dashboard",
          icon: <IoIosStats size={isOpenSidebar ? "20" : "24"} />,
        },
        {
          path: `/admin/info/${id}/verification`,
          name: "verification",
          icon: <MdOutlineVerified size={isOpenSidebar ? "20" : "24"} />,
        },
        {
          path: `/admin/info/${id}/reports`,
          name: "reports",
          icon: <TbReportSearch size={isOpenSidebar ? "20" : "24"} />,
        }
      ];

      const routes2 = [
        {
          path: `/admin/info/${id}/events`,
          name: "events",
          icon: <BsCalendar3 size={isOpenSidebar ? "19" : "24"} />,
        },
        {
          path: `/admin/info/${id}/testimonials`,
          name: "testimonials",
          icon: <RiUserStarLine size={isOpenSidebar ? "20" : "24"} />,
        },
        {
          path: `/admin/info/${id}/courses`,
          name: "courses",
          icon: <MdCastForEducation size={isOpenSidebar ? "19" : "24"} />,
        }
      ];
    
      const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);
    
      const midSectionAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
        },
        show: {
          width: "100%",
          opacity: 1,
          transition: {
            duration: 0.1,  
          },
        },
      };
    
      const scoreAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
        },
        show: {
          width: "auto",
          opacity: 1,
          transition: {
            duration: 0.1,
          },
        },
      };
    
      const menuTextAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
          transition: {
            duration: 0.4,
          },
        },
        show: {
          width: "auto",
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        },
      };
    
      const closeSidebar = () => {
        if(isOpenSidebar && window.innerWidth < 940){
          setIsOpenSidebar(!isOpenSidebar)
        }
      }

      const getAdminInfo = ()=>{
        axios.get(`http://localhost:8000/admin/getadmininfo/${id}`).then(({data})=>{
        setAdminInfo(data);
    })
    }
      useEffect(()=>{
        getAdminInfo()
      },[])


  return (
    <div className="main_container_sidebar">
      <motion.div
        animate={{
          width: window.innerWidth > 940 ? (isOpenSidebar ? "280px" : "60px") : (isOpenSidebar ? "280px" : "0px"),
          position: window.innerWidth >940 ? "fixed" : "fixed",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        className="sidebar_container_sidebar"
      >
        <div className="top_section_sidebar">
          {isOpenSidebar && (theme === "light-theme") && <img src={Logo} alt="logo" />}
          {isOpenSidebar && (theme === "dark-theme") && <img src={Logo2} alt="logo" />}
          <div
            className="hamburger_menu_sidebar"
            style={{ marginLeft: isOpenSidebar ? "20px" : "-10px" }}
          >
            <CgMenuRight size={38} onClick={toggleSidebar} />
          </div>
        </div>

        <AnimatePresence>
          {isOpenSidebar && (
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={midSectionAnimation}
              className="mid_section_sidebar"
            >
              <div className="user_image_container_sidebar">
                <img src={UserImage} alt="user" />
              </div>
              <h2>
                Hello, <span>{adminInfo.name}</span>
              </h2>
              <h3>{adminInfo.email}</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpenSidebar && (
          <motion.div initial="hidden"
          animate="show"
          exit="hidden"
          variants={scoreAnimation} className="score_section2_sidebar">
          { adminInfo.role === "superadmin"? (<button className="btn_light_sidebar" onClick={()=>navigate(`/admin/${id}/signup`)}>Create Admin</button>):""}
        </motion.div>
        )}

        <section className="routes_container_sidebar">
          {routes.map((routes) => (
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "routes_link_sidebar active_sidebar"
                  : "routes_link_sidebar"
              }
              to={routes.path}
              key={routes.name}
              style={{ padding: isOpenSidebar ? "13px 20px" : "20px" }}
              onClick={closeSidebar}
            >
              <div className="side_menu_icon_sidebar">{routes.icon}</div>
              <AnimatePresence>
                {isOpenSidebar && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={menuTextAnimation}
                    className="side_menu_text_sidebar"
                  >
                    {routes.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>

        { adminInfo.role === "superadmin"? (
          <section className="routes_container_sidebar">
          {routes2.map((routes) => (
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "routes_link_sidebar active_sidebar"
                  : "routes_link_sidebar"
              }
              to={routes.path}
              key={routes.name}
              style={{ padding: isOpenSidebar ? "13px 20px" : "20px" }}
              onClick={closeSidebar}
            >
              <div className="side_menu_icon_sidebar">{routes.icon}</div>
              <AnimatePresence>
                {isOpenSidebar && (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={menuTextAnimation}
                    className="side_menu_text_sidebar"
                  >
                    {routes.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
        ) : "" }
        
      </motion.div>
      <motion.main
        className="children_container_sidebar"
        animate={{
          paddingLeft: window.innerWidth > 940 ? (isOpenSidebar ? "280px" : "60px") : "0px",
          transition: { duration: 0.3, type: "spring,", damping: 11 },
        }}
        style = {{position:"absolute"}}
      >
        <Header2Company 
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          theme={theme}
          setTheme={setTheme}
          name={adminInfo.name}
        />
        {children}
      </motion.main>
    </div>
  )
}

export default SidebarAdmin
