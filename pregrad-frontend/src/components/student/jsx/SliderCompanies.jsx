import React from "react";
import "../css/SliderCompaniesStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper";
import Company1 from "../../../img/home-banner/company1.png";
import Company2 from "../../../img/home-banner/company2.png";
import Company3 from "../../../img/home-banner/company3.png";
import Company4 from "../../../img/home-banner/company4.png";
import Company5 from "../../../img/home-banner/company5.png";
import Company6 from "../../../img/home-banner/company6.png";
import Company7 from "../../../img/home-banner/company7.png";
import Company8 from "../../../img/home-banner/company8.png";

const SliderCompanies = () => {
  return (
    <div>
      <div className="main_container_slidercompanies">
        <div className="main_top_section_slidercompanies">
          <h2>Top Internship Opportunities</h2>
          <p>Get an opportunity to learn from industry leaders</p>
        </div>

        <div className="main_bottom_section_slidercompanies">
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            autoplay={{
              delay: 1,
              disableOnInteraction: true,
            }}
            speed={1200}
            navigation={true}
            modules={[Autoplay, Navigation]}
            loop={true}
            className="mySwiper"
          >
            <SwiperSlide className="swiper_container_slider">
              <img src={Company1} alt="company1" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company2} alt="company2" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company3} alt="company3" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company4} alt="company4" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company5} alt="company5" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company6} alt="company6" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company7} alt="company7" />
            </SwiperSlide>
            <SwiperSlide className="swiper_container_slider">
              <img src={Company8} alt="company8" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderCompanies;
