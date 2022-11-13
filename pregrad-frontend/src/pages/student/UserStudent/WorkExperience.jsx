import React, { useState, useEffect } from 'react';
import "../../../components/student/css/UserStudent/WorkExperienceStyles.css";
import { FiFileText } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios'
import {useCookies} from 'react-cookie';
import PageLoader from "../../../img/page-loader.gif";


const WorkExperience = ({profilehealth,userHealthProfile}) => {

  const navigate = useNavigate()

  const {id} = useParams()

  const [cookies,setCookie,removeCookie] = useCookies([])

  const [editform,seteditform] = useState("")

  const [isContent, setIsContent] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const [isModalDelete, setIsModalDelete] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const [editworkexperience,setEditWorkExperience] = useState({})

  const [studentwork,setStudentwork] = useState([])

  // Skills
  let skillsData = ["HTML", "CSS", "JS", "NodeJs", "ExpressJs", "MongoDB", "C++/C", "Java", "Python", "Bootstrap", "Figma", "Photoshop", "Illustrator"];
  const [skills, setSkills] = useState(skillsData);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [editSkills,setEditSkills] = useState(skillsData)

  const [editselectedSkills, seteditSelectedSkills] = useState([]);

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

  const handleEditSkill = (event) => {
    if(selectedSkills.length < 10){
      seteditSelectedSkills(current => [...current, event.target.value])
      setEditSkills(current => current.filter(editSkills => {
        return editSkills !== event.target.value;
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

  const deleteEditSkill = (value) => {
    seteditSelectedSkills(current => current.filter(selectedSkill => {
      return selectedSkill !== value;
    }))
    setEditSkills(current => [...current, value])
  }


  const [workexperience, setWorkExperience] = useState({
    companyname: "",
    position: "",
    role: "",
    duration: "",
    websitelink: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setWorkExperience({
      ...workexperience,
      [name]: value
    })
  }

  const updateForm = (e)=>{
    const {name, value} = e.target;
    setEditWorkExperience({
      ...editworkexperience,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(workexperience));
    setIsSubmit(true);
    
  }

  const getWorkExperience = ()=>{
    axios.get(`http://localhost:8000/student/getworkexperience/${id}`).then((res)=>{
      if(res.data.message === "true"){  
    setStudentwork(res.data.workexperience)
    if(res.data.workexperience.length > 0){
      setIsContent(true)
    }
  else{
    setIsContent(false)
  }
    setTimeout(() => {
      setIsPageLoading(false)
    },800)

        setStudentwork(res.data.workexperience)
        userHealthProfile()

      }
    }).catch((err)=>{
      console.log(err)
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
          // console.log("Profile from Experience",profilehealth)
          navigate(`/student/${id}/workexperience`)
          setIsPageLoading(true)
          getWorkExperience()
        
        }
      }
    }
    verifyUser()
    if( Object.keys(formErrors).length === 0 && isSubmit ){
     axios.post(`http://localhost:8000/student/workexperience/${id}`,{
      ...workexperience,skills:selectedSkills
     }).then((res)=>{
      if(res.data.errors){
        setFormErrors(res.data.errors);
      }
     else if(res.data.message === "true")
      {
        setIsModal(!isModal);
        getWorkExperience();
        // userHealthProfile()
      }else if(res.data.message === "You cannot add duplicate information"){
        setFormErrors({others: res.data.message});
       }
     })
    }
  }, [formErrors,cookies,removeCookie,navigate,profilehealth]);

  const validate = (values) => {
    const errors = {};

    if(!values.companyname){
      errors.companyname = "Name required";
    }

    if(!values.position){
      errors.position = "Position of responsibility required";
    }
    
    if(!values.role){
      errors.role = "Description of role required";
    }

    if(!values.duration){
      errors.duration = "Duration required";
    }else if(parseInt(values.duration) < 1){
      errors.duration = "Duration should be greater than 1"
    }else if(!Number.isInteger(parseFloat(values.duration))){
      errors.duration = "Duration should not be in decimal"
    }

    if(!values.websitelink){
      errors.websitelink = "Website Link required";
    }

    if(selectedSkills.length < 3){
      errors.skills = "Minimum 3 skills required"
    }

    return errors;
  }

  const setStateValue = ()=>{
    setIsModal(!isModal)
    seteditform("addnew")
    setSelectedSkills([])
    setSkills(skillsData)
  }

const editWorkExperience = async(u_id,w_id)=>{
  setIsModal(!isModal) 
  seteditform("edit")
  const {data} = await axios.get(`http://localhost:8000/student/updateworkexperience/${u_id}/${w_id}`)
  seteditSelectedSkills(data.skills)
  skillsData = skillsData.filter((e)=> !data.skills.includes(e))
  setEditSkills(skillsData)
  setEditWorkExperience(data)
}
 
const deleteWorkExperience = async(u_id,w_id)=>{
  const {data} = await axios.delete(`http://localhost:8000/student/deleteworkexperience/${u_id}/${w_id}`)
 
  if(data.message === "true")
  {
   getWorkExperience()
  //  userHealthProfile()
  }
}

const UpdatedWorExperience = async(e,u_id)=>{
  e.preventDefault();
   
  const {data} = await axios.put(`http://localhost:8000/student/updatedworkexperience/${u_id}/${editworkexperience._id}`,{
    ...editworkexperience,skills:editselectedSkills
  })

  if(data.workexperience){
    setStudentwork(data.workexperience)
    setIsModal(!isModal)
    getWorkExperience()
  }
  else{
    setFormErrors(data.errors);
  }
 
}

const Cancel = ()=>{
  setIsModal(!isModal)
  setIsSubmit(false)
  setFormErrors({}) 
}

  return (
    <div>
      <div className='sub_header_workexperience'>
        <h5>Work Experience</h5>
      </div>

      {isPageLoading ? (
        <div className='page_loading_container_workexperience'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_workexperience'>
          {!isContent ? (
            <div className='add_section1_workexperience'>
              <div className='add_section1_logo_workexperience'>
              <FiFileText size={30} className="add_section1_icon_workexperience" />
              </div>
              <div className='add_section1_details_workexperience'>
                <h2>Add Work Experience Details</h2>
                <p>Add your school / college information</p>
              </div>
              <button className='btn_light_workexperience' onClick={() => setStateValue()}>+ Add New</button>
            </div>
          ) : (
            <>
            <div className='add_section2_workexperience'>
              <div className='add_section2_left_workexperience'>
              <div className='add_section2_logo_workexperience'>
                <FiFileText size={26} className="add_section2_icon_workexperience" />
              </div>
              <div className='add_section2_details_workexperience'>
                <h2>Add Work Experience Details</h2>
                <p>Add your school / college information</p>
              </div>
              </div>
              <button className='btn_light_workexperience' onClick={() => setStateValue()}>+ Add New</button>
            </div>
{
  studentwork.map(work=>(
    <div className='content_container_workexperience' key={work._id}>
              <div className='top_section_content_workexperience'>
                <h4>{work.companyname}</h4>
                <div className='content_logo_container_workexperience'>
                <div className='content_logo_workexperience' onClick={()=>editWorkExperience(id,work._id)}>
                  <BiEditAlt size={22} className="content_icon_workexperience" />
                </div>
                <div className='content_logo_workexperience' onClick={()=>deleteWorkExperience(id,work._id)}>
                  <MdOutlineDelete size={22} color='#ef233c' />
                </div>
                </div>
              </div>

              <div className='bottom_section_content_workexperience'>
                <h4>{work.position}</h4>
                <h3>{work.duration} months</h3>
                <p>{work.role}</p>
                <a href={work.websitelink}>Website Link</a>
              </div>

              <div className='skills_content_workexperience'>
                <ul>
                  {
                     work.skills.map((skill)=>(
                     <li key={skill}>{skill}</li>
                     ))
   }
                </ul>
              </div>

              {/* {
                  isModalDelete && (
                    <div className='modal2_background_workexperience'>
                      {console.log("hello")}
                      <div className='modal2_box_workexperience'>
                        <h3>Are you sure you want to delete this Education ?</h3>
                        <div className='modal2_button_container_workexperience'>
                          <button className='btn_light_workexperience' onClick={() => setIsModalDelete(!isModalDelete)}>Cancel</button>
                          <button className='btn_cancel_workexperience'>Delete</button>
                        </div>
                      </div>
                    </div>
                  )
                } */}
            </div>
  ))
            }
            </>
          )}
        </div>
      )}
      

        {isModal && (
          <div className='modal_backgound_workexperience'>
          <div className='modal_container_workexperience'>
            <div className='modal_top_section_workexperience'>
              <h2>Work Experience Details</h2>
              <p className="errors_msg_workexperience">{formErrors.others}</p>
            </div>
{
  editform === "addnew"?(
            <div className='modal_mid_section_workexperience'>
              <form>
                <div className="form_box_workexperience">
                  <label>Company Name</label>
                  <input type="text" name="companyname" placeholder="Enter company name" onChange={handleForm} />
                  <p className="errors_msg_workexperience">{formErrors.companyname}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Position Of Responsibility</label>
                  <input type="text" name="position" placeholder="Enter your position"   onChange={handleForm} />
                  <p className="errors_msg_workexperience">{formErrors.position}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Describe Your Role (in 70-100 words)</label>
                  <textarea type="text" name="role" placeholder="Enter your skills" onChange={handleForm} />
                  <p className="errors_msg_workexperience">{formErrors.role}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Duration (in months)</label>
                  <input type="number" name="duration" placeholder="Enter duration" onChange={handleForm} />
                  <p className="errors_msg_workexperience">{formErrors.duration}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Company Website Link</label>
                  <input type="url" name="websitelink" placeholder="Enter website link"   onChange={handleForm} />
                  <p className="errors_msg_workexperience">{formErrors.websitelink}</p>
                </div>

                <div className="form_box_workexperience">
                <label className="label_workexperience">Skills Used</label>
                
                <select onChange={handleSkill} className="select_workexperience">
                  <option value="">Select Skills</option>
                  {skills.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>

                <div className="selected_domains_container_workexperience">
                  {selectedSkills.map((val) => (
                    <div className="selected_domains_box_workexperience" key={val}>
                      <p>{val}</p>
                      <FaTimes onClick={e => {deleteSkill(val)}} className="selected_domains_icon_workexperience" />
                    </div>
                  ))}
                </div>
                  <p className="errors_msg_workexperience">{formErrors.skills}</p>
                </div>

                <div className='modal_bottom_section_workexperience'>
                  <button className='btn_light_workexperience' onClick={Cancel}>Cancel</button>
                  <button type='submit' onClick={submitForm} className='btn_primary_workexperience'>Save Details</button>
                </div>
              </form>
            </div>
            ):(
              <div className='modal_mid_section_workexperience'>
              <form>
                <div className="form_box_workexperience">
                  <label>Company Name</label>
                  <input type="text" name="companyname" placeholder="Enter company name" value={editworkexperience.companyname || ''}  onChange={updateForm} />
                  <p className="errors_msg_workexperience">{formErrors.companyname}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Position Of Responsibility</label>
                  <input type="text" name="position" placeholder="Enter your position" value={editworkexperience.position || ''}  onChange={updateForm} />
                  <p className="errors_msg_workexperience">{formErrors.position}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Describe Your Role (in 70-100 words)</label>
                  <textarea type="text" name="role" placeholder="Enter your skills" value={editworkexperience.role || ''}  onChange={updateForm} />
                  <p className="errors_msg_workexperience">{formErrors.role}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Duration (in months)</label>
                  <input type="number" name="duration" placeholder="Enter duration" value={editworkexperience.duration || ''}  onChange={updateForm} />
                  <p className="errors_msg_workexperience">{formErrors.duration}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Company Website Link</label>
                  <input type="url" name="websitelink" placeholder="Enter website link" value={editworkexperience.websitelink || ''}  onChange={updateForm} />
                  <p className="errors_msg_workexperience">{formErrors.websitelink}</p>
                </div>

                <div className="form_box_workexperience">
                  <label>Skills Used</label>
                  <select onChange={handleEditSkill} className="select_projects">
                  <option value="">Select Skills</option>
                  {editSkills.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>

                <div className="selected_domains_container_projects">
                
                  {editselectedSkills.map((val) => (
                    <div className="selected_domains_box_projects" key={val}>
                      <p>{val}</p>
                      <FaTimes onClick={e => {deleteEditSkill(val)}} className="selected_domains_icon_projects" />
                    </div>
                  ))}
                </div>
                  <p className="errors_msg_workexperience">{formErrors.skills}</p>
                </div>

                <div className='modal_bottom_section_workexperience'>
                  <button className='btn_light_workexperience' onClick={Cancel}>Cancel</button>
                  <button type='submit' onClick={(e)=>UpdatedWorExperience(e,id)} className='btn_primary_workexperience'>Save Details</button>
                </div>
              </form>
            </div>
            )
}
            
          </div>
        </div>
        )}

             

    </div>
  )
}

export default WorkExperience;

// deleteWorkExperience(id,work._id)