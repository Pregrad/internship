import React, { useState, useEffect } from "react";
import HeaderUser from "../../components/student/jsx/HeaderUser";
import "../../components/student/css/DetailsOneStyles.css";
import { BsArrowRightShort } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import axios from 'axios'
import {useNavigate,useParams}  from "react-router-dom"
import {useCookies} from 'react-cookie'

const DetailsOne = ({theme, setTheme}) => {

  const navigate = useNavigate()

  const {id} = useParams()

 const [cookies,setCookie,removeCookie] = useCookies([])

 const  [user,setUser] = useState({})

 const [video,setVideo] = useState("")

  var currentYear = new Date().getFullYear();



  const yearData = [];
  for(let i=0; i<10; i++){
    if(i<7){
      yearData[i] = currentYear+i;
    }else {
      currentYear --;
      yearData[i] = currentYear;
    }
    yearData.sort();
  }

  const domainsData = ["Front-End" , "Back-End", "Full Stack Software", "Mobile Engineering", "Product Management", "Data Scientist", "BUSINESS OPERATIONS", "MARKETING", "SALES AND BUSINESS DEVELOPMENT", "MEDIA, COMMUNICATIONS, PUBLIC RELATIONS", "DATA ANALYTICS", "FINANCE", "ARTS AND DESIGN", "DATABASE ADMINISTRATION", "EVENT PLANNING", "ECONOMICS AND POLICY"]
  const skillsData = ["HTML", "CSS", "JS", "NodeJs", "ExpressJs", "MongoDB", "C++/C", "Java", "Python", "Bootstrap", "Figma", "Photoshop", "Illustrator"];
  const collegeData = ["Nitte Meenakshi Institute Of Technology", "BVCOE", "MSIT", "New Horizon College Of Engineering", "MAIT", "Netaji Subhash Chandra Bose Subharti Medical College", "Neelam College Of Engineering & Technology", "Naraina Vidya Peeth Engineering & Management Institute"]
  const locationData = ["Delhi, New Delhi", "Mumbai", "Chennai", "Jaipur", "Hyderabad"];



  // College
  const [selectedCollege, setSelectedCollege] = useState("");
 
  const handleCollege = (event) => {
    setSelectedCollege(event.target.value);
  }

  // Year
  const [selectedYear, setSelectedYear] = useState("");      //
  const handleYear = (event) => {
    setSelectedYear(event.target.value)
  }

  // Location
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocation = (event) => {
    setSelectedLocation(event.target.value)
  }

  // Domains
  const [domains, setDomains] = useState(domainsData);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const handleDomain = (event) => {
    if(selectedDomains.length < 2){
      setSelectedDomains(current => [...current, event.target.value])
      setDomains(current => current.filter(domain => {
        return domain !== event.target.value;
      }))
    }else{
       setFormErrors({...formErrors,
      domain: "Maximum 2 domains allowed"})
    }
  }

  const deleteDomain = (value) => {
    setSelectedDomains(current => current.filter(selectedDomain => {
      return selectedDomain !== value;
    }))
    setDomains(current => [...current, value])
  }

  // Skills
  const [skills, setSkills] = useState(skillsData);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkill = (event) => {
    if(selectedSkills.length < 10){
      setSelectedSkills(current => [...current, event.target.value])
      setSkills(current => current.filter(skill => {
        return skill !== event.target.value;
      }))
    }else{
      setFormErrors({...formErrors,
        skills: "Maximum 10 skills allowed"})
    }
  }

  const deleteSkill = (value) => {
    setSelectedSkills(current => current.filter(selectedSkill => {
      return selectedSkill !== value;
    }))
    setSkills(current => [...current, value])
  }
  // Form
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [socialLink, setsocialLinks] = useState({
    github: "",
    linkedin: "",
    instagram: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setsocialLinks({
      ...socialLink,
      [name]: value
    })
  }

  const handleVideo = (e) => {
    setVideo(e.target.value)
  }

  const detailsOneStudent= {
    selectedYear,
    selectedLocation,
    selectedDomains,
    selectedSkills,
    selectedCollege,
    socialLink,
    video
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(socialLink));
    setIsSubmit(true);
  }

  const getUserDetails= async()=>{

    axios.get(`http://localhost:8000/userDetails/${id}`).then(({data})=>{
      if(data.verified){
        navigate(`/student/${id}/internships`)
      }else{
        navigate(`/student/${id}/detailsone`)
        setUser(data);
       } 
    })
  }

  useEffect(() => {
    
    const verifyUser = async()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.post(`http://localhost:8000/student`,{},{withCredentials:true}) 
        if(data.id !== id || data.status !== true){
          removeCookie("jwt")
          navigate('/login')
        }else{
          getUserDetails()
        }
      }
    }
    verifyUser()
    
    if( Object.keys(formErrors).length === 0 && isSubmit ){
     axios.post(`http://localhost:8000/student/detailsone/${id}`,{
      ...detailsOneStudent
     }).then(({data})=>{
      if(data.errors){
        setFormErrors(data.errors)
      }
      else if(data.message == "true" && data.verified == true)
      {
        navigate(`/student/${id}/internships`)
      }else{
        navigate(`/student/${id}/detailsone`)
      }
     })
    }
  }, [formErrors,cookies,removeCookie,navigate]);

  const validate = (values) => {
    const errors = {};

    if(!selectedCollege){
      errors.college = "College name required"
    }

    if(!selectedYear){
      errors.year = "Year of graduation required"
    }

    if(selectedDomains.length < 1){
      errors.domain = "Minimum 1 domain required"
    }

    if(selectedSkills.length < 3){
      errors.skills = "Minimum 3 skills required"
    }

    if(!selectedLocation){
      errors.location = "Work location required"
    }

    if(!values.linkedin){
      errors.linkedin = "Link required";
    }

    return errors;
  }

  return (
    <div>

      <HeaderUser theme={theme} setTheme={setTheme} name={user.name}/>

      <div className="main_detailsOne">
        <div className="greeting_container_detailsOne">
          <div className="greeting_box_detailsOne">
            <div className="greeting_left_section_detailsOne">
              <h4>Welcome to Pregrad</h4>
              <p><span>{user.name} , </span> build your profile to join our community.</p>
            </div>

            <div className="greeting_right_section_detailsOne">
              <button className="btn_primary_detailsOne" onClick={submitForm}>Submit <BsArrowRightShort size={27} className="btn_primary_logo_detailsOne" />
              </button>
            </div>
          </div>
        </div>

        <div className="form_container_detailsOne">
          <form>
            <div className="form_main_box_detailsOne">
              <div className="form_box_detailsOne box1_detailsOne">
                <label className="label_detailsOne">Q. College / University name ?</label>
                <select onChange={handleCollege} className="select_detailsOne">
                  <option value="other">Enter College Name</option> 
                  {collegeData.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
                <p className="errors_msg_detailsOne">{formErrors.college}</p>
              </div>

              <div className="form_box_detailsOne box2_detailsOne">
                <label className="label_detailsOne">Q. Year of graduation ?</label>
                <select onChange={handleYear} className="select_detailsOne">
                  <option value="other">Enter Graduation Year</option> 
                  {yearData.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
                <p className="errors_msg_detailsOne">{formErrors.year}</p>
              </div>

              <div className="form_box_detailsOne box3_detailsOne">
                <label className="label_detailsOne">Q. Which domain are you interested in working ?</label>

                <select onChange={handleDomain} className="select_detailsOne">
                  <option value="">Select</option>
                  {domains.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>

                <div className="selected_domains_container_detailsOne">
                  {selectedDomains.map((val) => (
                    <div className="selected_domains_box_detailsOne" key={val}>
                      <p>{val}</p>
                      <FaTimes onClick={e => {deleteDomain(val)}} className="selected_domains_icon_detailsOne" />
                    </div>
                  ))}
                </div>
                <p className="errors_msg_detailsOne">{formErrors.domain}</p>
              </div>

              <div className="form_box_detailsOne box4_detailsOne">
                <label className="label_detailsOne">Q. Enter your skills ?</label>
                
                <select onChange={handleSkill} className="select_detailsOne">
                  <option value="">Select</option>
                  {skills.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>

                <div className="selected_domains_container_detailsOne">
                  {selectedSkills.map((val) => (
                    <div className="selected_domains_box_detailsOne" key={val}>
                      <p>{val}</p>
                      <FaTimes onClick={e => {deleteSkill(val)}} className="selected_domains_icon_detailsOne" />
                    </div>
                  ))}
                </div>
                <p className="errors_msg_detailsOne">{formErrors.skills}</p>
              </div>

              <div className="form_box_detailsOne box5_detailsOne">
                <label className="label_detailsOne">Q. What locations do you want to work in?</label>
                <select onChange={handleLocation} className="select_detailsOne">
                  <option value="other">Enter Locations </option> 
                  {locationData.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
                <p className="errors_msg_detailsOne">{formErrors.location}</p>
              </div>

              <div className="form_box_detailsOne box6_detailsOne">
                <label className="label_detailsOne">Q. Enter Your Introductory Video ( Optional) </label>
                <input type="url" name="video" value={video} onChange={handleVideo} placeholder="Video Link" />
                <p className="video_para_detailsOne">Add your Introductory video to increase your chances of getting selected.</p>
              </div>

              <div className="form_box_detailsOne box7_detailsOne">
                <label className="label_detailsOne">Q. Linkedin Link</label>
                <input type="url" name="linkedin" value={socialLink.linkedin} onChange={handleForm} placeholder="Enter your linkedin link" />
                <p className="errors_msg_detailsOne">{formErrors.linkedin}</p>
              </div>

              <div className="form_box_detailsOne box8_detailsOne">
                <label className="label_detailsOne">Q. Github Link ( Optional )</label>
                <input type="url" name="github" value={socialLink.github} onChange={handleForm} placeholder="Enter your github link" />
              </div>

              <div className="form_box_detailsOne box9_detailsOne">
              <label className="label_detailsOne">Q. Instagram Link ( Optional )</label>
                <input type="url" name="instagram" value={socialLink.instagram} onChange={handleForm} placeholder="Enter your Instagram link" />
              </div>
            </div>
          </form>

          <button onClick={submitForm} className="btn_primary_detailsOne">Submit <BsArrowRightShort size={27} className="btn_primary_logo_detailsOne" />
              </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsOne;
