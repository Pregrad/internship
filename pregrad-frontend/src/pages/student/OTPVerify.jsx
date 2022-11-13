import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import OTPVerifyLogo from "../../img/otpverify-image.png";
import InstaLogo from "../../img/instagram-logo.svg";
import LinkedinLogo from "../../img/linkedin-logo.svg";
import YoutubeLogo from "../../img/youtube-logo.svg";
import "../../components/student/css/EmailOTPVerifyStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import HeaderAuth from "../../components/student/jsx/HeaderAuth";

const OTPVerify = ({theme, setTheme}) => {

  const navigate = useNavigate();

const {email,type} = useParams()

  const toggleTheme = () => {
    if(theme === "light-theme"){
      setTheme("dark-theme");
    }else{
      setTheme("light-theme");
    }
  }

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    email: email,
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: ""
  });


// const [sendDetails,setSendDetails] = useState({})



  const handleForm = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

 

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
  }

  useEffect(() => {
    if( Object.keys(formErrors).length === 0 && isSubmit ){
    
      axios.post(`http://localhost:8000/verifyotp`, user)
      .then( res => {
        if(res.data.errors){
          setFormErrors(res.data.errors)
        }
        else if(res.data.message === "true"){
          if(type === 'register'){
          navigate("/login");
        }else{
          navigate(`/forgotpassword/${email}`)
        }
        }else {
          setFormErrors({final: res.data.message})
        }
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect Email Format";
    }


    return errors;
  }


  return (
    <div>
      <HeaderAuth theme={theme} setTheme={setTheme} />

      <div className="main_emailOtp">
        <div className="left-part_emailOtp">
          <div className="top_emailOtp">
            <h2>Find Your Dream Job !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_emailOtp">
            <img src={OTPVerifyLogo} alt="Sign Up" />
          </div>

          <div className="social_emailOtp">
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_emailOtp">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_emailOtp">
          <div className="form-container_emailOtp">
            <div className="top_emailOtp">
              <h2>Verify Your Email Id</h2>
              <Link to="/signup">Create an account</Link>
            </div>

            <div className="line_emailOtp"></div>

            <div className="main-error-msg_emailOtp">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_emailOtp">
              <form>
                <div className="form-full_emailOtp">
                <div className="form-container-box_emailOtp">
                  <label>Email Address</label>
                  <input type="text" name="email" placeholder="Your Email Address" readOnly value={user.email} onChange={handleForm} />
                  <p className="errors-msg">{formErrors.email}</p>
                </div>

                <div className="form-container-box_emailOtp">
                  <label>Enter OTP</label>
                  <div className="otp-field_emailOtp">
                    <input type="text" maxLength="1" name="otp1" value={user.otp1} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp2" value={user.otp2} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp3" value={user.otp3} onChange={handleForm} />
                    <input type="text" maxLength="1" name="otp4" value={user.otp4} onChange={handleForm} />
                  </div>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-button_emailOtp">
                  Verify Email
                  <BsArrowRightShort size={27} className="create-btn-logo_emailOtp" />
                </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
