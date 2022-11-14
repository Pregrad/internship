import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import EmailVerifyLogo from "../../img/emailverify-image.png";
import InstaLogo from "../../img/instagram-logo.svg";
import LinkedinLogo from "../../img/linkedin-logo.svg";
import YoutubeLogo from "../../img/youtube-logo.svg";
import "../../components/student/css/EmailOTPVerifyStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import HeaderAuth from "../../components/student/jsx/HeaderAuth";

const EmailVerify = ({theme, setTheme}) => {
  const navigate = useNavigate();

const {type} = useParams() ; // useParams is used to extract the `type` from the url link.
// type can be of two types : register and forgotpassword


const toggleTheme = () => {
    if(theme === "light-theme"){
      setTheme("dark-theme");
    }else{
      setTheme("light-theme");
    }
  }

  const [loading, setLoading] = useState(false); // set loader to true or false. 

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    email: ""
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
      setLoading(!loading);
      axios.post(`http://localhost:8000/verifyemail/?type=${type}`, user)
      .then( res => {
        if(res.data.errors){
          setLoading(!loading);
          setFormErrors(res.data.errors);
        }
       else if(res.data.message === "true"){
          if(res.data.type === "register"){
          setLoading(!loading);
          navigate(`/otpverify/${user.email}/${res.data.type}`);
        }else if(res.data.type === "forgotpassword"){
          setLoading(!loading);
          navigate(`/otpverify/${user.email}/${res.data.type}`);
        }
        }
        else {
          setLoading(false);
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
            <img src={EmailVerifyLogo} alt="Sign Up" />
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
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_emailOtp">{formErrors.email}</p>
                </div>
                </div>

                <button disabled={loading} type="submit" onClick={submitForm} className="create-button_emailOtp">
                  {!loading ? (
                    <>
                    Verify Email
                    <BsArrowRightShort size={27} className="create-btn-logo_emailOtp" />
                    </>
                    ) : (
                      <>
                      <div className="loading-spinner_emailOtp"></div>
                      Loading
                      </>
                    )}
                </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
