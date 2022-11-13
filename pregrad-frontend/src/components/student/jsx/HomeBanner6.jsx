import React, { useState, useRef,useEffect } from "react";
import "../css/HomeBanner6Styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from "axios";

const HomeBanner6 = () => {
  let flag = true;
  
  const [events,setEvents] = useState([]);

  const getExtra = ()=>{
    axios.get(`http://localhost:8000/admin/showcources`).then(({data})=>{
      if(data){
        setEvents(data.data[0].events);

        if(data.data[0].events.length < 3){
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
      <div className="main_container_homebanner6">
        <div className="main_top_section_homebanner6">
          <h2>Join Now </h2>
          <div className="main_top_lower_section_homebanner6">
            <p>Events</p>
          </div>
        </div>

        <div className="main_bottom_section_homebanner6">
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
(events != undefined)?events.map((event)=>(
           
            <SwiperSlide className="swiper_homebanner6" key={event._id}>
          <a href={event.eventlink} target="_blank">
             <div className="course_box_homebanner6">
              <div className="course_box_upper_section_homebanner6">
                <img src={event.imagelink} alt="course" />
                <div className="course_details_homebanner6">
                  <h2>{event.name}</h2>
                  <h3>{event.speaker} | {event.organisation}</h3>
                  <p>{event.date} | {event.time}</p>
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

export default HomeBanner6;
