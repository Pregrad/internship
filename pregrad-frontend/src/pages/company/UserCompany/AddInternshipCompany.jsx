import React, { useEffect, useState } from "react";
import "../../../components/company/css/UserCompany/AddInternshipCompanyStyles.css";
import { FaTimes } from "react-icons/fa";
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
const AddInternshipCompany = () => {
  // TITLES

  const navigate = useNavigate();

  const {id} = useParams();

  const [companydetails,setCompanyDetails] = useState({})

  var query = window.location.search.substring(1).split("&");

  const type = query[0].split("=")[1];
 
  const titleData = [
    "Front-End",
    "Back-End",
    "Full Stack Software",
    "Mobile Engineering",
    "Product Management",
    "Data Scientist",
    "BUSINESS OPERATIONS",
    "MARKETING",
    "SALES AND BUSINESS DEVELOPMENT",
    "MEDIA, COMMUNICATIONS, PUBLIC RELATIONS",
    "DATA ANALYTICS",
    "FINANCE",
    "ARTS AND DESIGN",
    "DATABASE ADMINISTRATION",
    "EVENT PLANNING",
    "ECONOMICS AND POLICY",
  ];


  const [selectedTitles, setSelectedTitles] = useState("");

  const handleTitle = (event) => {
    console.log(event.target.value)
    setSelectedTitles(event.target.value);
  };

  // OFFICE TYPE
  const officeTypeData = ["Remote", "In-Office", "Flexible"];
  const [selectedOfficeType, setSelectedOfficeType] = useState("");

  const handleOfficeType = (event) => {
    setSelectedOfficeType(event.target.value);
  };
  // SKILLS
 let skillsData = [
    "HTML",
    "CSS",
    "JS",
    "NodeJs",
    "ExpressJs",
    "MongoDB",
    "C++/C",
    "Java",
    "Python",
    "Bootstrap",
    "Figma",
    "Photoshop",
    "Illustrator",
  ];

  const [skills, setSkills] = useState(skillsData);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkill = (event) => {
    if (selectedSkills.length < 10) {
      setSelectedSkills((current) => [...current, event.target.value]);
      setSkills((current) =>
        current.filter((skill) => {
          return skill !== event.target.value;
        })
      );
    } else {
      console.log("error");
    }
  };

  const deleteSkill = (value) => {
    setSelectedSkills((current) =>
      current.filter((selectedSkill) => {
        return selectedSkill !== value;
      })
    );
    setSkills((current) => [...current, value]);
  };

  // DURATION
  const durationData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleDuration = (event) => {
    setSelectedDuration(event.target.value);
  };

  // MODE OF INTERNSHIP
  const modeData = ["Part-Time", "Full-Time"];
  const [selectedMode, setSelectedMode] = useState("");

  const handleMode = (event) => {
    setSelectedMode(event.target.value);
  };

  // EXPERIENCE
  const experienceData = ["Beginner", "Intermediate", "Expert"];
  const [selectedExperience, setSelectedExperience] = useState("");

  const handleExperience = (event) => {
    setSelectedExperience(event.target.value);
  };

  // START DATE
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  // EXTRA BENEFITS
  const [letterCheckbox, setLetterCheckbox] = useState(false);
  const [certiCheckbox, setCertiCheckbox] = useState(false);
  const [jobCheckbox, setJobCheckbox] = useState(false);
  const [bonusCheckbox, setBonusCheckbox] = useState(false);

  // SUBMIT FORM 
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [info, setInfo] = useState({
    positions: "",
    startdate: "",
    minstipend: "",
    maxstipend: "",
    about: ""
  })

  const handleForm = (event) => {
    const {name, value} = event.target;
    setInfo({
      ...info,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(info));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {};

    if(!selectedTitles){
      errors.title = "Internship title required"
    }

    if(!selectedOfficeType){
      errors.officetype = "Office type required"
    }

    if(selectedSkills.length < 3){
      errors.skills = "Minimum 3 skills required"
    }

    if(!values.positions){
      errors.positions = "No. of positions required"
    }else if(values.positions < 1){
      errors.positions = "Minimum 1 position required"
    }else if(values.positions > 50){
      errors.positions = "Maximum 50 positions allowed"
    }

    if(!selectedDuration){
      errors.duration = "Duration of internship required"
    }

    if(!selectedMode){
      errors.mode = "Internship mode required"
    }

    if(!selectedExperience){
      errors.experience = "Experience required"
    }

    if(!values.startdate){
      errors.startdate = "Tentative start date required"
    }

    if(!values.minstipend){
      errors.minstipend = "Minimum stipend required"
    }else if(values.minstipend < 2000){
      errors.minstipend = "Minimum 2000 stipend required"
    }

    if(!values.maxstipend){
      errors.maxstipend = "Maximum stipend required"
    }else if(parseFloat(values.maxstipend) <= parseFloat(values.minstipend)){
      errors.maxstipend = "Maximum stipend should be greater than minimum"
    }

    if(!values.about){
      errors.about = "Description of internship required"
    }

    return errors;
  }

  const addInternship = {
    info,
    selectedTitles,
    selectedOfficeType,
    selectedSkills,
    selectedDuration,
    selectedMode,
    selectedExperience,
    letterCheckbox,
    certiCheckbox,
    jobCheckbox,
    bonusCheckbox
  }

  const setEditInternship = ()=>{
    const iid = query[1].split("=")[1];
    axios.get(`http://localhost:8000/company/singleinternship/${iid}`).then(({data})=>{
      setInfo({...info,
      positions: data.noofemployees,
      startdate: data.startfrom,
      minstipend: data.stipend.minimum,
      maxstipend: data.stipend.maximum,
      about:data.description
    })
    setSelectedExperience(data.experience)
    setSelectedTitles(data.title)
    setSelectedOfficeType(data.jobtype)
    setSelectedSkills(data.skills)
    setSelectedDuration(data.duration)
    setSelectedMode(data.jobmode)
    setLetterCheckbox(data.perks.letter)
    setCertiCheckbox(data.perks.certificate)
    setJobCheckbox(data.perks.job)
    setBonusCheckbox(data.perks.bonus)
    })
  }  

  const getCompanyInfo = ()=>{
    axios.get(`http://localhost:8000/company/getcompanyinfo/${id}`).then(({data})=>{
      if(data.isAuthorized === "Verified"){
        setCompanyDetails(data);
      }
      else{
        navigate(`/company/info/${id}/dashboard`);
      }
})
}

  useEffect(() => {

    getCompanyInfo();

    if(Object.keys(formErrors).length === 0 && isSubmit){
      if(type == "editinternship"){
        const iid = query[1].split("=")[1];
        axios.put(`http://localhost:8000/company/editinternships/${iid}`,{  
          ...addInternship
        }).then(({data})=>{
          if(data.errors){
            setFormErrors(data.errors);
          }else{
            navigate(`/company/info/${id}/listings`)
          }
      })
    }
    else{
        axios.post(`http://localhost:8000/company/addinternships/${id}`,{
          ...addInternship
        }).then(({data})=>{
          if(data.errors){
            setFormErrors(data.errors);
          }else{
            navigate(`/company/info/${id}/listings`)
          }
        })
      }  
    }

    if(type == "editinternship"){
      setEditInternship();
    } 

  }, [formErrors])
  


  return (
    <div>
      
        <div className="main_box_addinternshipcompany">
        <div className="main_container_addinternshipcompany">
          <div className="top_section_addinternshipcompany">
            <h2>New Internship</h2>
          </div>
          <div className="mid_section_addinternshipcompany">
            <form>
              <div className="form_container_addinternshipcompany">
                <div className="form_box_addinternshipcompany">
                  <label>Internship Title*</label>
                  <select onChange={handleTitle}>
                    <option value="" disabled selected hidden>
                    { (type == "editinternship")?selectedTitles:"Choose Internship Title"}
                    </option>
                    {titleData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <p className="errors_msg_addinternshipcompany">{formErrors.title}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Office Type*</label>
                  <select onChange={handleOfficeType}>
                  <option value="" disabled selected hidden>
                  { (type == "editinternship")?selectedOfficeType:"Choose Office Type"} 
                    </option>
                
                    {officeTypeData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <p className="errors_msg_addinternshipcompany">{formErrors.officetype}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Skills (upto 10 skills)*</label>
                  <select onChange={handleSkill}>
                    <option value="">Select</option>
                    {
                      (type == "editinternship")?(skillsData.filter((element)=>!selectedSkills.includes(element)).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>))):(skills.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                      )))
                  }
                  </select>

                  <div className="selected_domains_container_addinternshipcompany">
                    {selectedSkills.map((val) => (
                      <div
                        className="selected_domains_box_addinternshipcompany"
                        key={val}
                      >
                        <p>{val}</p>
                        <FaTimes
                          onClick={(e) => {
                            deleteSkill(val);
                          }}
                          className="selected_domains_icon_addinternshipcompany"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="errors_msg_addinternshipcompany">{formErrors.skills}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>No. of Positions*</label>
                  <input type="number" name="positions" placeholder="Enter Number" value={info.positions} onChange={handleForm} />
                  <p className="errors_msg_addinternshipcompany">{formErrors.positions}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Duration* (months)</label>
                  <select onChange={handleDuration}>
                    <option value=""  disabled selected hidden>
                    {(type == "editinternship")?selectedDuration:"Set Internship Duration"}
                    </option> 
                    {durationData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <p className="errors_msg_addinternshipcompany">{formErrors.duration}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Internship Mode*</label>
                  <select onChange={handleMode}>
                    <option value="" disabled selected hidden>
                    { (type == "editinternship")?selectedMode:"Choose Mode"}   
                    </option>
                    {modeData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <p className="errors_msg_addinternshipcompany">{formErrors.mode}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Experience of Interns required*</label>
                  <select onChange={handleExperience}>
                    <option value="" disabled selected hidden>
                    { (type == "editinternship")?selectedExperience:"Choose Experience"}   
                    </option>
                    {experienceData.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <p className="errors_msg_addinternshipcompany">{formErrors.experience}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Tentative Start Date*</label>
                  <input type="date" min={disablePastDate()} value={info.startdate} name="startdate" placeholder="dd-mm-yyyy" onChange={handleForm} />
                  <p className="errors_msg_addinternshipcompany">{formErrors.startdate}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Minimum Stipend (per month)*</label>
                  <input type="number" name="minstipend" value={info.minstipend} placeholder="Least Amount" onChange={handleForm}></input>
                  <p className="errors_msg_addinternshipcompany">{formErrors.minstipend}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Maximum Stipend (per month)*</label>
                  <input type="number" name="maxstipend" value={info.maxstipend} placeholder="Highest Amount" onChange={handleForm}></input>
                  <p className="errors_msg_addinternshipcompany">{formErrors.maxstipend}</p>
                </div>

                <div className="form_box_addinternshipcompany">
                  <label>Job Description*</label>
                  <textarea name="about" rows={7} value={info.about} placeholder="Responsibilities and Requirements" onChange={handleForm}></textarea>
                  <p className="errors_msg_addinternshipcompany">{formErrors.about}</p>
                </div>

                <div className="form_box_addinternshipcompany checkbox_container_addinternshipcompany">
                  <label>Extra Benefits</label>
                  <div>
                    <input type="checkbox" id="cb1" onClick={() => setLetterCheckbox(!letterCheckbox)} checked={letterCheckbox}/>
                    <label for="cb1"></label>
                    <p>Letter of Recommendation</p>
                  </div>
                  <div>
                    <input type="checkbox" id="cb2" onClick={() => setCertiCheckbox(!certiCheckbox)} checked={certiCheckbox}/>
                    <label for="cb2"></label>
                    <p>Certificate</p>
                  </div>
                  <div>
                    <input type="checkbox" id="cb3" onClick={() => setJobCheckbox(!jobCheckbox)} checked={jobCheckbox}/>
                    <label for="cb3"></label>
                    <p>Job Offer / PPO</p>
                  </div>
                  <div>
                    <input type="checkbox" id="cb4" onClick={() => setBonusCheckbox(!bonusCheckbox)} checked={bonusCheckbox}/>
                    <label for="cb4"></label>
                    <p>Performance Bonus</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="bottom_section_addinternshipcompany">
            <button onClick={submitForm} className="btn_primary_addinternshipcompany">Post Internship</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInternshipCompany;
