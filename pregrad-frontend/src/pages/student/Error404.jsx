import React from 'react';
import "../../components/student/css/Error404Styles.css";
import Error404Img from "../../img/error404.gif";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

  return (
    <div>
      <div className='main_container_error'>
        <div className='main_box_error'>
            <div className='left_section_box_error'>
                <h4>OOPS!</h4>
                <h3>The page you were looking for does not exist</h3>
                <p>Not to worry, You can head over to our homepage, find more stuffs or check out some new internships with exciting offers.</p>
                <button onClick={()=>navigate('/')}>Go to Home</button>
            </div>

            <div className='right_section_box_error'>
                <img src={Error404Img} alt="Error404" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Error404
