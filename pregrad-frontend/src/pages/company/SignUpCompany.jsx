import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import SignUpLogo from "../../img/signupcompany-image.png";
import InstaLogo from "../../img/instagram-logo.svg";
import LinkedinLogo from "../../img/linkedin-logo.svg";
import YoutubeLogo from "../../img/youtube-logo.svg";
import GoogleLogo from "../../img/google-logo.svg";
import "../../components/company/css/SignUpCompanyStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import HeaderAuth from "../../components/student/jsx/HeaderAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = ({theme, setTheme}) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const type = "register"

  const [user, setUser] = useState({
    name: "",
    companyname: "",
    designation: "",
    email: "",
    password: "",
    mobile: "",
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
      axios.post("http://localhost:8000/company/register", user)
      .then( res => {
        if(res.data.errors){
          setFormErrors(res.data.errors);
        }
        else if(res.data.message === "true"){
          navigate(`/emailverify/${type}`);
        }else {
          setFormErrors({final: res.data.message});
        }
      });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!values.name){
      errors.name = "Name required";
    }else if(values.name.length < 2){
      errors.name = "Minimum 2 characters required";
    }else if(values.name.length > 18){
      errors.name = "Maximum 18 characters required";
    }

    if(!values.email){
      errors.email = "Email required";
    }else if(!regex.test(values.email)){
      errors.email = "Incorrect Email Format";
    }

    if(!values.companyname){
      errors.companyname = "Company name required";
    }else if(values.companyname.length < 2){
      errors.companyname = "Minimum 2 characters required";
    }else if(values.companyname.length > 18){
      errors.companyname = "Maximum 18 characters required";
    }

    if(!values.designation){
      errors.designation = "Designation required";
    }else if(values.designation.length > 20){
      errors.designation = "Maximum 20 characters required";
    }

    if(!values.password){
      errors.password = "Password required";
    }else if(values.password.length < 6){
      errors.password = "Min 6 characters required";
    }else if(values.password.length > 12){
      errors.password = "Max 12 characters allowed";
    }

    if(!values.confirmpassword){
      errors.confirmpassword = "Confirm Password required";
    }else if(values.confirmpassword !== values.password){
      errors.confirmpassword = "Confirm password didn't match password";
    }

    if(!values.mobile){
      errors.mobile = "Mobile number required"
    }else if(values.mobile.length !== 10){
      errors.mobile = "Mobile number is Invalid";
    }

    if(!checkboxCheck){
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  }

  return (
    <div>
      <HeaderAuth theme={theme} setTheme={setTheme} />

      <div className="main_signupcompany">
        <div className="left-part_signupcompany">
          <div className="top_signupcompany">
            <h2>Find Your Dream Intern !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_signupcompany">
            <img src={SignUpLogo} alt="Sign Up" />
          </div>

          <div className="social_signupcompany">
            <div className="social-logo_signupcompany">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_signupcompany">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_signupcompany">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_signupcompany">
          <div className="form-container_signupcompany">
            <div className="top_signupcompany">
              <h2>Create Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signupcompany"></div>

            <div className="main-msg_signupcompany">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_signupcompany">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signupcompany">
                <div className="form-box_signupcompany box1_signupcompany">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.name}</p>
                </div>

                <div className="form-box_signupcompany box2_signupcompany">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.email}</p>
                </div>

                <div className="form-box_signupcompany box3_signupcompany">
                  <label>Company Name</label>
                  <input type="text" name="companyname" placeholder="Your Company Name" value={user.companyname} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.companyname}</p>
                </div>

                <div className="form-box_signupcompany box4_signupcompany">
                  <label>Designation</label>
                  <input type="text" name="designation" placeholder="Enter Designation" value={user.designation} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.designation}</p>
                </div>

                <div className="form-box_signupcompany box5_signupcompany">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobile" placeholder="Your Mobile Number" value={user.mobile} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.mobile}</p>
                </div>

                <div className="form-box_signupcompany box6_signupcompany">
                  <label>Password</label>
                  <input type={showPassword ? "password" : "text"} name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  {
                  showPassword ? (<AiOutlineEye title="Show password" className="hide_password_signupcompany" onClick={()=>setShowPassword(!showPassword)} />) 
                  : 
                  (<AiOutlineEyeInvisible title="Hide password" className="hide_password_signupcompany" onClick={()=>setShowPassword(!showPassword)} />)
                  }
                  <p className="errors-msg_signupcompany">{formErrors.password}</p>
                </div>

                <div className="form-box_signupcompany box7_signupcompany">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" placeholder="Confirm Password" value={user.confirmpassword} onChange={handleForm} />
                  <p className="errors-msg_signupcompany">{formErrors.confirmpassword}</p>
                </div>

                <div className="box8_signupcompany">
                  <div>
                  <input type="checkbox" id="cb1" onClick={() => setCheckboxCheck(!checkboxCheck)} />
                  <label for="cb1"></label>
                  <p><span>I agree to</span> <a href="youtube.com">Terms and Conditions</a></p>
                  </div>
                  <p className="errors-msg_signupcompany">{formErrors.checkbox}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_signupcompany">
                  Create New Account
                  <BsArrowRightShort size={27} className="create-btn-logo_signupcompany" />
                </button> 

                {/* <a className="google-btn_signupcompany" href="youtube.com">
                <img src={GoogleLogo} alt="" />
                  Signup with Google
                </a>  */}
              </form>

              <div className="line_signupcompany"></div>

              <div className="bottom-part_signupcompany">
                <p>Have an account ? </p>
                <Link to="/login">&nbsp;Login Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
