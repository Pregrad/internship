import React, { useState, useEffect } from 'react'
import HeaderAuth from '../../components/student/jsx/HeaderAuth';
import "../../components/student/css/ResumeStyles.css";
import "../../components/student/css/UserStudent/ResumeStudentStyles.css";
import ProfileBackground from "../../img/profile-background.jpg";
import { BiDownload, BiEditAlt, BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import jsPDF from "jspdf"
import { FaRegFileVideo, FaTimes } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';


const Resume = ({theme, setTheme}) => {
  const  [user,setUser] = useState({})

  const [Achievement,setAchievement] = useState([])
  const [WorkExperience,setWorkExperience] = useState([])
  const [Project,setProject] = useState([])
  const [Education,setEducation] = useState([])
  const [studentSkill,setStudentSkills] = useState([])
  const [studentDomain,setstudentDomain]= useState([])
  const [studentSocialLink,setStudentSocialLink]= useState({})
  const [videoLink,setVideoLink]= useState("")

  const {id} = useParams()

      useEffect(() => {
        getUserDetails();
        getUserData();
      })

      const getUserDetails= async()=>{
        const {data} = await axios.get(`http://localhost:8000/userDetails/${id}`)
        setUser(data)
      }

      const getUserData = async()=>{
        const {data} = await axios.get(`http://localhost:8000/student/profile/${id}`)
      
        if(data.message === "true"){
        setAchievement(data.achievement)
        setProject(data.project)
        setWorkExperience(data.workexperience)
        setEducation(data.education)
        setStudentSkills(data.skills)
        setstudentDomain(data.domain)
        setStudentSocialLink(data.socialLink)
        setVideoLink(data.videolink)
      }
      }
    
      const initials = user.name
      const name_initials=typeof initials==="string" ?initials.split('')[0]:""

    const generatePDF = async () => {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector(".main_container_resumestudent"), {
            callback: function(pdf){
                pdf.save("pregradresume.pdf");
            }
        })
      }

  return (
    <div>
      <HeaderAuth theme={theme} setTheme={setTheme}/>

      <div className="main_container_resume">
        <div className="profile_container_resume">
          <div className="profile_background_resume">
            <img src={ProfileBackground} alt="background" />
            <div className="profile_edit2_container_resume">
                <div className="profile_edit4_resume" onClick={generatePDF} title="Download Resume">
                  <BiDownload size={20} />
                </div>

                <div className="profile_edit3_resume" title="Video Resume">
                  <a href={videoLink} target="_blank"><FaRegFileVideo /></a>
                </div>
            </div>

          </div>

          <div className="profile_user_details_resume">
            <div className="user_image_resume">
            {name_initials}
            </div>
            <div className="profile_info_resume">
              <div className="info_container_resume">
                <div className="info_left_section_resume">
                  <h5>{user.name}</h5>
                  {
                    studentDomain.map((domain)=>(
                      <p>{domain}</p>
                    ))
                  }
                </div>
                <div className="info_middle_section_resume">
                  <h5>{user.email}</h5>
                </div>
              </div>

              <div className="profile_edit_container_resume">
                <div className="profile_edit_resume" onClick={generatePDF} data-tip data-for="pdfDownload">
                  <BiDownload />
                </div>
                <ReactTooltip id="pdfDownload" place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800}>
                  <span>Download your pdf resume</span>
                </ReactTooltip>

                <div className="profile_edit_resume" data-tip data-for="videoResume">
                  <a href={videoLink} target="_blank"><FaRegFileVideo /></a>
                </div>
                <ReactTooltip id="videoResume" place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800}>
                  <span>Video resume - An Introductory video for your resume</span>
                </ReactTooltip>
              </div>

              
            </div>
          </div>
        </div>

        <div className="main_details_container_resume">
          <div className="main_details_left_section_resume">
            <div className="social_container_resume card_resume">
              <h4>Social Links</h4>
              <div className="line_resume"></div>
              <div className="social_links_box_resume">
                
              {  studentSocialLink.github == ""?(""): (<a href={studentSocialLink.github} target="_blank"><AiFillGithub className="social_links_resume" /></a>)}
                {  studentSocialLink.linkedin == ""?(""): (<a href={studentSocialLink.linkedin} target="_blank"><AiFillLinkedin className="social_links_resume" /></a>)}
                {  studentSocialLink.instagram == ""?(""): (<a href={studentSocialLink.instagram} target="_blank"><AiFillInstagram className="social_links_resume" /></a>)}
                  
              </div>
            </div>

            <div className="skills_container_resume card_resume">
              <h4>Skills</h4>
              <div className="line_resume"></div>
              <div className="skills_box_resume">
              {studentSkill.map((value) => (
                  <div key={value} className="skill_section_resume">
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="education_container_resume card_resume">
              <h4>Education</h4>
              <div className="line_resume"></div>
              
              {
              Education.map((edu)=>(
              <div className="education_info_box_resume" key={edu._id}>
                <h3>{edu.university}</h3>
                <h5>{edu.degree},{edu.field}</h5>
                <p>{edu.start} - {edu.end}</p>
              </div>
              ))   
              }
            </div>

            <div className="achievements_container_resume card_resume">
              <h4>Achievements</h4>

              <div className="line_resume"></div>
            
              {
              Achievement.map((achi)=>(
                <div className="achievements_info_box_resume" key={achi._id}>
                <h3>{achi.title}</h3>
                <a href={achi.certificate} target="_blank">Certificate Link</a>
              </div>
              ))
              }
            </div>
          </div>

          <div className="main_details_right_section_resume">
            <div className="workexperience_container_resume card_resume">
              <h4>Work Experience</h4>
              <div className="line_resume"></div>
              {        
              WorkExperience.map((work)=>(
              <div className="workexperience_details_box_resume" key={work._id}>
                <h3>{work.companyname}</h3>
                <h5>{work.position} | {work.duration} months</h5>
                <p>
                {work.role}  
                </p>
                <div className="skills_content_resume">
                  <ul>
                    {work.skills.map((skill) => (
                      <li>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              ))
              }   
            </div>

            <div className="projects_container_resume card_resume">
              <h4>Projects</h4>
              <div className="line_resume"></div>
              {          
              Project.map((proj)=>(
              <div className="projects_details_box_resume" key={proj._id}>
                <h3>{proj.projecttitle}</h3>
                <p>
                {proj.description}
                </p>
                <a href={proj.projectlink} target="_blank" data-tip data-for="projectLink">
                  <BiLink size={24} className="project_details_icon_resume" />
                </a>
                <ReactTooltip id="projectLink" place="left" data-background-color="#1e272e" effect="solid" delayShow={800} data-event-off="click">
                  <span>Project Link</span>
                </ReactTooltip>
                <div className="skills_content_resume">
                  <ul>
                  {proj.skills.map((skill) => (
                      <li>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>





      {/* RESUME */}

       <div className='resumestudent'>
        <div className="main_container_resumestudent">
        <div className="profile_container_resumestudent">

          <div className="profile_user_details_resumestudent">
            <div className="user_image_resumestudent">
              <p>G</p>
            </div>
            <div className="profile_info_resumestudent">
              <div className="info_container_resumestudent">
                <div className="info_left_section_resumestudent">
                  <h5>{user.name}</h5>
                  {
                    studentDomain.map((domain)=>(
                      <p>{domain}</p>
                    ))
                  }
                </div>
                <div className="info_middle_section_resumestudent">
                  <h5>{user.email}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main_details_container_resumestudent">
          <div className="main_details_left_section_resumestudent">
            <div className="social_container_resumestudent card_resumestudent">
              <h4>Social Links</h4>
              <div className="line_resumestudent"></div>
              <div className="social_links_box_resumestudent">
                <a href={studentSocialLink.github}>{studentSocialLink.github}</a>
                <a href={studentSocialLink.linkedin}>{studentSocialLink.linkedin}</a>
                <a href={studentSocialLink.instagram}>{studentSocialLink.instagram}</a>
              </div>
            </div>

            <div className="skills_container_resumestudent card_resumestudent">
              <h4>Skills</h4>
              <div className="line_resumestudent"></div>
              <div className="skills_box_resumestudent">
                {studentSkill.map((value) => (
                  <div key={value} className="skill_section_resumestudent">
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            {
              Education.length != 0?
              ( <div className="education_container_resumestudent card_resumestudent">
              <h4>Education</h4>
              <div className="line_resumestudent"></div>
       {
       Education.map((edu)=>(
        <div className="education_info_box_resumestudent" key={edu._id}>
                <h3>{edu.university}</h3>
                <h5>{edu.degree}, {edu.field}</h5>
                <p>{edu.start} - {edu.start} </p>
            </div>  
       ))
       }
              
            </div>
            )
            :""
                      
            }
                 { 
                   (Achievement.length!=0)?
              (
              <div className="achievements_container_resumestudent card_resumestudent">
              <h4>Achievements</h4>

              <div className="line_resumestudent"></div>
             {
              Achievement.map((achi)=>(
              <div className="achievements_info_box_resumestudent">
                <h3>{achi.title}</h3>
                <a href={achi.certificate}>{achi.certificate}</a>
              </div>
              ))
                
             } 
            </div>
            ):""
            }
          </div>

          <div className="main_details_right_section_resumestudent">
            {
              (WorkExperience.length != 0)?(
                <div className="workexperience_container_resumestudent card_resumestudent">
                <h4>Work Experience</h4>
                <div className="line_resumestudent"></div>
  
           { 
           WorkExperience.map((work)=>(
            <div className="workexperience_details_box_resumestudent">
            <h3>{work.companyname}</h3>
            <h5>{work.position} | {work.duration} months</h5>
          <p>
         {work.role}
          </p>
          <div className="skills_content_resumestudent">
              <ul>
                {work.skills.map((skill) => (
                  <li>{skill}</li>
                ))}
              </ul>
          </div>
          </div>
           ))
          
          }
  
               
          </div>
              ):""
      
        }

            {
         
         Project.length !=0?(
          <div className="projects_container_resumestudent card_resumestudent">
     
              <h4>Projects</h4>
              <div className="line_resumestudent"></div>

            {
              Project.map((proj)=>(
              <div className="projects_details_box_resumestudent" key={proj._id}>
              <h3>{proj.projecttitle}</h3>
              <p>
              {proj.description} 
              </p>
              <a href={proj.projectlink}>
             {proj.projectlink}
              </a>
              <div className="skills_content_resumestudent">
                <ul>
                {proj.skills.map((skill) => (
                      <li>{skill}</li>
                    ))}
                </ul>
              </div>
            </div>))
              }
  
            </div>
         ):""
        }
          </div>
        </div>
      </div>
    </div> 
    </div>
  )
}

export default Resume
