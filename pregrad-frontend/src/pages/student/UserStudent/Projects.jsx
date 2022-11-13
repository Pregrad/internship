import React, { useState, useEffect } from 'react';
import "../../../components/student/css/UserStudent/ProjectsStyles.css";
import { FiFileText } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate,useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from 'axios'
import {useCookies} from 'react-cookie';
import PageLoader from "../../../img/page-loader.gif";

const Projects = () => {
  const [isContent, setIsContent] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const [editform,seteditform] = useState("")

  const [editproject,setEditProject] = useState({})

  const navigate = useNavigate()

   const {id} = useParams()

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const [cookies,setCookie,removeCookie] = useCookies([]);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [studentpro,setStudentpro] = useState([])

  const [getproject,setGetProject] = useState([])

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

  const [project, setProject] = useState({
    projecttitle: "",
    description: "",
    projectlink: ""
  });   

  const updateForm = (e)=>{
    const {name, value} = e.target;
    setEditProject({
      ...editproject,
      [name]: value
    })
  }
  

  const handleForm = (e) => {
    const {name, value} = e.target;
    setProject({
      ...project,
      [name]: value
    })
   
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(project));
    setIsSubmit(true);
   
  }

const getProjects = async()=>{
  const {data} = await axios.get(`http://localhost:8000/student/getprojects/${id}`)
  if(data.message==="true"){
    setGetProject(data.project)
    if(data.project.length > 0){
      setIsContent(true)
    }
  else{
    setIsContent(false)
  }
  setTimeout(() => {
    setIsPageLoading(false)
  },800)
  }
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
          navigate(`/student/${id}/projects`)
          setIsPageLoading(true)
           getProjects()
        }
      }
    }
    verifyUser()
    if( Object.keys(formErrors).length === 0 && isSubmit ){
      axios.post(`http://localhost:8000/student/projects/${id}`,{
            ...project,skills:selectedSkills
      }).then(res=>{
        if(res.data.errors){
          setFormErrors(res.data.errors);
        }
        else if(res.data.message==="true"){
          setIsModal(!isModal)
           getProjects()
        }else if(res.data.message === "You cannot add duplicate information"){
          setFormErrors({others: res.data.message});
         }
      })
    }
  },[formErrors,cookies,removeCookie,navigate]);

  const validate = (values) => {
    const errors = {};

    if(!values.projecttitle){
      errors.projecttitle = "Title required";
    }

    if(!values.description){
      errors.description = "Description required";
    }

    if(selectedSkills.length < 3){
      errors.skills = "Minimum 3 skills required"
    }

    if(!values.projectlink){
      errors.projectlink = "Project Link required";
    }

    return errors;
  }

const deleteProject = async(u_id,p_id)=>{
 const {data} = await axios.delete(`http://localhost:8000/student/deleteproject/${u_id}/${p_id}`)
 if(data.message === "true")
 {
  getProjects()
 }
}

const UpdatedProject = async(e,u_id)=>{

  e.preventDefault();

    const {data} = await axios.put(`http://localhost:8000/student/updatedproject/${u_id}/${editproject._id}`,{
      ...editproject,skills:editselectedSkills
    })
    if(data.project){
      setStudentpro(data.project)
      setIsModal(!isModal)
      getProjects()
    }
    else{
      setFormErrors(data.errors);
    }
 
}

const editProject = async(u_id,p_id)=>{
  setIsModal(!isModal) 
  seteditform("edit")
  const {data} = await axios.get(`http://localhost:8000/student/updateproject/${u_id}/${p_id}`)
  seteditSelectedSkills(data.skills)
  skillsData = skillsData.filter((e)=> !data.skills.includes(e))
  setEditSkills(skillsData)
  setEditProject(data)
}


const setStateValue = ()=>{
  setIsModal(!isModal)
  seteditform("addnew")
  setSelectedSkills([])
  setSkills(skillsData)
}

const Cancel = ()=>{
  setIsModal(!isModal) 
  setIsSubmit(false)
  setFormErrors({})
}


  return (
    <div>
      <div className='sub_header_projects'>
        <h5>Projects</h5>
      </div>

      {isPageLoading ? (
        <div className='page_loading_container_projects'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_projects'>
          {!isContent ? (
            <div className='add_section1_projects'>
              <div className='add_section1_logo_projects'>
              <FiFileText size={30} className="add_section1_icon_projects" />
              </div>
              <div className='add_section1_details_projects'>
                <h2>Add Project Details</h2>
                <p>Projects that you have worked on before</p>
              </div>
              <button className='btn_light_projects' onClick={() => setStateValue()}>+ Add New</button>
            </div>
          ) : (
            <>
            <div className='add_section2_projects'>
              <div className='add_section2_left_projects'>
              <div className='add_section2_logo_projects'>
                <FiFileText size={26} className="add_section2_icon_projects" />
              </div>
              <div className='add_section2_details_projects'>
                <h2>Add Project Details</h2>
                <p>Projects that you have worked on before</p>
              </div>
              </div>
              <button className='btn_light_projects' onClick={() => setStateValue()}>+ Add New</button>
            </div>
{ 
  getproject.map(proj=>(
 <div className='content_container_projects' key={proj._id}>
 <div className='top_section_content_projects'>
   <h4>{proj.projecttitle}</h4>
   <div className='content_logo_container_projects'>
     <div className='content_logo_projects' onClick={()=>editProject(id,proj._id)}>
       <BiEditAlt size={22} className="content_icon_projects"/>
     </div>
     <div className='content_logo_projects' onClick={()=>deleteProject(id,proj._id)}>
       <MdOutlineDelete size={22} color='#ef233c' />
     </div>
   </div>
 </div>

 <div className='bottom_section_content_projects'>
   <p>{proj.description}</p>
  <span><a href={proj.projectlink}>Project Link</a></span>
 </div>
            {/* <div className='content_container_projects'>
              <div className='top_section_content_projects'>
                <h4>E-commerce Website</h4>
                <div className='content_logo_container_projects'>
                  <div className='content_logo_projects'>
                    <BiEditAlt size={22} className="content_icon_projects" />
                  </div>
                  <div className='content_logo_projects'>
                    <MdOutlineDelete size={22} color='#ef233c' />
                  </div>
                </div>
              </div>

              <div className='bottom_section_content_projects'>
                <p>"Ambaram" is web application that provides a compelling user experience has a large lists of products and provides lot of offers. Responsive in all devices.</p>
                <a href='yo'>Project Link</a>
              </div> */}

 <div className='skills_content_projects'>
   <p style={{padding:"3px",marginLeft:"-20px"}}></p>
   <ul style={{marginLeft:"10px"}}>
   {
   proj.skills.map((skill)=>(
     <li key={skill}>{skill}</li>
   ))
   
   }
   </ul>
 </div>
</div>
))
           
}            
</>
          )}
        </div>
      )}
      

        {isModal && (
        
          <div className='modal_backgound_projects'>
          <div className='modal_container_projects'>
            <div className='modal_top_section_projects'>
              <h2>Project Details</h2>
              <p className="errors_msg_projects">{formErrors.others}</p>
            </div>
   {     editform === "addnew"?(
   
                 <div className='modal_mid_section_projects'>
                 <form>
                   <div className="form_box_projects">
                     <label>Project Title</label>
                     <input type="text" name="projecttitle" placeholder="Enter project title"  onChange={handleForm} />
                     <p className="errors_msg_projects">{formErrors.projecttitle}</p>
                   </div>
   
                   <div className="form_box_projects">
                     <label>Description of Project</label>
                     <input type="text" name="description" placeholder="Enter project description"   onChange={handleForm} />
                     <p className="errors_msg_projects">{formErrors.description}</p>
                   </div>
   
                   <div className="form_box_projects">
                   <label className="label_projects">Skills Used</label>
                
                <select onChange={handleSkill} className="select_projects">
                  <option value="">Select Skills</option>
                  {skills.map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
                <div className="selected_domains_container_projects">
                  {selectedSkills.map((val) => (
                    <div className="selected_domains_box_projects" key={val}>
                      <p>{val}</p>
                      <FaTimes onClick={e => {deleteSkill(val)}} className="selected_domains_icon_projects" />
                    </div>
                  ))}
                </div>
                     <p className="errors_msg_projects">{formErrors.skills}</p>
                   </div>
   
                   <div className="form_box_projects">
                     <label>Project Link</label>
                     <input type="url" name="projectlink" placeholder="Enter project link" onChange={handleForm} />
                     <p className="errors_msg_projects">{formErrors.projectlink}</p>
                   </div>
   
                   <div className='modal_bottom_section_projects'>
                     <button className='btn_light_projects' onClick={Cancel}>Cancel</button>
                     <button type='submit' onClick={submitForm} className='btn_primary_projects'>Save Details</button>
                   </div>
                 </form>
               </div>
   ):(
    <div className='modal_mid_section_projects'>
                 <form>
                   <div className="form_box_projects">
                     <label>Project Title</label>
                     <input type="text" name="projecttitle" placeholder="Enter project title" value={editproject.projecttitle}  onChange={updateForm} />
                     <p className="errors_msg_projects">{formErrors.projecttitle}</p>
                   </div>
   
                   <div className="form_box_projects">
                     <label>Description of Project</label>
                     <input type="text" name="description" placeholder="Enter projectdescription" value={editproject.description}  onChange={updateForm} />
                     <p className="errors_msg_projects">{formErrors.description}</p>
                   </div>
   
                   <div className="form_box_projects">
                   <label className="label_projects">Skills Used</label>
                
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
                     <p className="errors_msg_projects">{formErrors.skills}</p>
                   </div>
   
                   <div className="form_box_projects">
                     <label>Project Link</label>
                     <input type="url" name="projectlink" placeholder="Enter project link" value={editproject.projectlink || ''}  onChange={updateForm} />
                     <p className="errors_msg_projects">{formErrors.projectlink}</p>
                   </div>
   
                   <div className='modal_bottom_section_projects'>
                     <button className='btn_light_projects' onClick={Cancel}>Cancel</button>
                     <button type='submit' onClick={(e)=>UpdatedProject(e,id)} className='btn_primary_projects'>Save Details</button>
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

export default Projects;
