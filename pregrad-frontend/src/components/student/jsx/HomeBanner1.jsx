import "../css/HomeBanner1Styles.css";
import User1 from "../../../img/user1.png";
import User2 from "../../../img/user2.png";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const HomeBanner1 = () => {
  return (
    <>
      <div className="homefront">
        <div className="left_container">
          <h1>
            Get quality <span>Internships & Jobs</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            optio modi! Vel consequatur odio reprehenderit ad numquam. Labore
            saepe at ducimus porro ex atque nobis, facere architecto tempore
            assumenda. Quidem?
          </p>
          <button className="btn_primary">
            Get Started <BsFillArrowRightCircleFill className="icon" />
          </button>
        </div>

        <div className="right_container">
          <div className="left">
            <div className="speech-bubble1">
              <img className="user1" src={User1} alt="" />{" "}
              <span className="line-1 anim-typewriter">Hello</span>
            </div>
            <div className="speech-bubble3">
              <img className="user1" src={User1} alt="" /> What to do from here!
            </div>
          </div>
          <div className="center">
            <div className="vl"></div>
          </div>
          <div className="right">
            <div className="speech-bubble2">
              <img className="user2" src={User2} alt="" /> Hi ! Thank You so
              much for coming
            </div>
            <div className="speech-bubble4">
              <img className="user2" src={User2} alt="" /> Create your profile
              and start your Career
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner1;
