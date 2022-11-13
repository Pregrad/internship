import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import ForgotPasswordLogo from "../../img/forgotpassword-image.png";
import InstaLogo from "../../img/instagram-logo.svg";
import LinkedinLogo from "../../img/linkedin-logo.svg";
import YoutubeLogo from "../../img/youtube-logo.svg";
import "../../components/student/css/EmailOTPVerifyStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import HeaderAuth from "../../components/student/jsx/HeaderAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgotPassword = ({theme, setTheme}) => {
  const navigate = useNavigate();

  const {email} = useParams();

  const [showPassword, setShowPassword] = useState(true);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    email: email,
    password: "",
    confirmpassword: ""
  });

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
      axios.post("http://localhost:8000/newpassword", user)
      .then( res => {
        if(res.data.errors){
          setFormErrors(res.data.errors);
        }
        else if(res.data.message === "true"){
          navigate("/login");
        }else {
          setFormErrors({final: res.data.message});
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

    if(!values.password){
        errors.password = "Password required";
    }else if(values.password.length < 6){
        errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
        errors.password = "Max 12 characters required";
    }

    if(!values.confirmpassword){
        errors.confirmpassword = "Confirm password required";
    }else if(values.confirmpassword !== values.password){
        errors.confirmpassword = "Confirm password didn't match password"
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
            <img src={ForgotPasswordLogo} alt="Sign Up" />
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
                  <p className="errors-msg_emailOtp">{formErrors.email}</p>
                </div>

                <div className="form-container-box_emailOtp box2_password_emailOtp">
                    <label>New Password</label>
                    <input type={showPassword ? "password" : "text"} name="password" placeholder="Enter new password" value={user.password} onChange={handleForm} />
                    {
                    showPassword ? (<AiOutlineEye title="Show password" className="hide_password_emailOtp" onClick={()=>setShowPassword(!showPassword)} />) 
                    : 
                    (<AiOutlineEyeInvisible title="Hide password" className="hide_password_emailOtp" onClick={()=>setShowPassword(!showPassword)} />)
                    }
                    <p className="errors-msg_emailOtp">{formErrors.password}</p>
                </div>

                <div className="form-container-box_emailOtp">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmpassword" placeholder="Confirm password" value={user.confirmpassword} onChange={handleForm} />
                    <p className="errors-msg_emailOtp">{formErrors.confirmpassword}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-button_emailOtp">
                  Change Password
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

export default ForgotPassword;
