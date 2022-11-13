import React, { useState, useEffect } from "react";
import "../css/HomeBanner5Styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import { BsStarFill, BsStarHalf } from "react-icons/bs"; 
import axios from "axios";

const HomeBanner5 = () => {
  let flag = true;

  const [courses,setCourses] = useState([]);

  const getExtra = ()=>{
    axios.get(`http://localhost:8000/admin/showcources`).then(({data})=>{
      if(data){
        setCourses(data.data[0].cources);
         if(data.data[0].cources.length < 3){
          flag = false;
        }
        else{
          flag = true;
        }
      }
    })
  }

  useEffect(()=>{
    getExtra();
  },[])


  return (
    <div>
      <div className="main_container_homebanner5">
        <div className="main_top_section_homebanner5">
          <h2>Upskill and get hired </h2>
          <div className="main_top_lower_section_homebanner5">
            <p>Courses</p>
            <button className="btn_primary_homebanner5">All Courses</button>
          </div>
        </div>

        <div className="main_bottom_section_homebanner5">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              460: {
                slidesPerView: 1.3,
                spaceBetween: 30,
              },
              658: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              960: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
            loop={flag ? false : true}
            className="mySwiper"
          >
          
              {

                  (courses != undefined)?courses.map((course)=>(
                    <SwiperSlide className="swiper_homebanner5" key={course._id}>
                    <a href={course.courselink} target="_blank">
                    <div className="course_box_homebanner5">
                     <div className="course_box_upper_section_homebanner5">
                       <img src={course.imagelink} alt="course" />
                       <div className="course_details_homebanner5">
                         <h2>{course.name}</h2>
                         <h3>{course.instructor} | {course.instructordetail}</h3>
                         <div className="course_info_homebanner5">
                           <p>{course.rating}</p>
                           <BsStarFill className="star_icon_courseadmin" />
                           <BsStarFill className="star_icon_courseadmin" />
                           <BsStarFill className="star_icon_courseadmin" />
                           <BsStarFill className="star_icon_courseadmin" />
                           <BsStarHalf className="star_icon_courseadmin" />
                           <h6>({course.enrolled})</h6>
                         </div>
                         <p>&#8377; {course.fee}</p>
                       </div>
                     </div>
                   </div>    
                     </a>
                     </SwiperSlide>
                  )):""

              }
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner5;
