import React, { useEffect, useState } from "react";
import { Link, useNavigate,useParams} from "react-router-dom";
import SignUpLogo from "../../img/signupcompany-image.png";
import InstaLogo from "../../img/instagram-logo.svg";
import LinkedinLogo from "../../img/linkedin-logo.svg";
import YoutubeLogo from "../../img/youtube-logo.svg";
import GoogleLogo from "../../img/google-logo.svg";
import "../../components/admin/css/SignUpAdminStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import axios from "axios";
import {useCookies} from 'react-cookie';
import HeaderAuth from "../../components/student/jsx/HeaderAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpAdmin = ({theme, setTheme}) => {
  const navigate = useNavigate();

  const {id} = useParams();

  const [cookies,setCookie,removeCookie] = useCookies([]);

  const [showPassword, setShowPassword] = useState(true);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const type = "register"

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:""
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

    const verifyUser = async()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.post(`http://localhost:8000/admin/checkadmin`,{},{withCredentials:true}) 
        if(data.id !== id || data.status !== true || data.role !== "superadmin"){ 
          removeCookie("jwt")
          navigate('/login')
        }else{
          // setIsPageLoading(true);
       
        }
      }
    }
    verifyUser()

    if( Object.keys(formErrors).length === 0 && isSubmit ){
      axios.post("http://localhost:8000/admin/register", user)
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

    if(!checkboxCheck){
      errors.checkbox = "Accept Terms & Conditions to Continue";
    }

    return errors;
  }

  return (
    <div>
      <HeaderAuth theme={theme} setTheme={setTheme} />

      <div className="main_signupadmin">
        <div className="left-part_signupadmin">
          <div className="top_signupadmin">
            <h2>Create Admin !</h2>
            <p>Sign Up to become a part of our community</p>
          </div>

          <div className="signup-banner_signupadmin">
            <img src={SignUpLogo} alt="Sign Up" />
          </div>

          <div className="social_signupadmin">
            <div className="social-logo_signupadmin">
              <a href="https://www.remove.bg/upload">
                <img src={InstaLogo} alt="Instagram" />
              </a>
            </div>
            <div className="social-logo_signupadmin">
              <a href="https://www.remove.bg/upload">
                <img src={LinkedinLogo} alt="Linkedin" />
              </a>
            </div>
            <div className="social-logo_signupadmin">
              <a href="https://www.remove.bg/upload">
                <img src={YoutubeLogo} alt="Youtube" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-part_signupadmin">
          <div className="form-container_signupadmin">
            <div className="top_signupadmin">
              <h2>Create Admin Account</h2>
              <Link to="/login">Sign In</Link>
            </div>

            <div className="line_signupadmin"></div>

            <div className="main-msg_signupadmin">
              <p>{formErrors.final}</p>
            </div>

            <div className="mid-part_signupadmin">
              <form onSubmit={submitForm}>
                <div className="form-main-box_signupadmin">
                <div className="form-box_signupadmin box1_signupadmin">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={handleForm} />
                  <p className="errors-msg_signupadmin">{formErrors.name}</p>
                </div>

                <div className="form-box_signupadmin box2_signupadmin">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="Your Email Address" value={user.email} onChange={handleForm} />
                  <p className="errors-msg_signupadmin">{formErrors.email}</p>
                </div>

                <div className="form-box_signupadmin box3_signupadmin">
                  <label>Password</label>
                  <input type={showPassword ? "password" : "text"} name="password" placeholder="Enter Password" value={user.password} onChange={handleForm} />
                  {
                  showPassword ? (<AiOutlineEye title="Show password" className="hide_password_signupadmin" onClick={()=>setShowPassword(!showPassword)} />) 
                  : 
                  (<AiOutlineEyeInvisible title="Hide password" className="hide_password_signupadmin" onClick={()=>setShowPassword(!showPassword)} />)
                  }
                  <p className="errors-msg_signupadmin">{formErrors.password}</p>
                </div>

                <div className="form-box_signupadmin box4_signupadmin">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmpassword" placeholder="Confirm Password" value={user.confirmpassword} onChange={handleForm} />
                  <p className="errors-msg_signupadmin">{formErrors.confirmpassword}</p>
                </div>

                <div className="box8_signupadmin">
                  <div>
                  <input type="checkbox" id="cb1" onClick={() => setCheckboxCheck(!checkboxCheck)} />
                  <label htmlFor="cb1"></label>
                  <p><span>I agree to</span> <a href="youtube.com">Terms and Conditions</a></p>
                  </div>
                  <p className="errors-msg_signupadmin">{formErrors.checkbox}</p>
                </div>
                </div>

                <button type="submit" onClick={submitForm} className="create-btn_signupadmin">
                  Create New Admin
                  <BsArrowRightShort size={27} className="create-btn-logo_signupadmin" />
                </button> 

                {/* <a className="google-btn_signupadmin" href="youtube.com">
                  <img src={GoogleLogo} alt="" />
                  Signup with Google
                </a>  */}
              </form>

              <div className="line_signupadmin"></div>

              <div className="bottom-part_signupadmin">
                <p>Have an account ? </p>
                <Link to="/login">&nbsp;Sign In Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAdmin 
