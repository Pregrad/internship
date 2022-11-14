import React, { useEffect, useState, useRef } from 'react';
import "../../company/css/UserCompany/ListingsCompanyStyles.css";
import { Link, useNavigate,useParams } from "react-router-dom";
import { BsFillBarChartFill, BsPlayCircle } from "react-icons/bs";
import { AiOutlineFieldTime, AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import ReactTooltip from 'react-tooltip';

const InternshipContainerStudent = ({internship,getAllInterships}) => {

    const ref = useRef();

    const navigate = useNavigate();

    const {id} = useParams()

    const skillsData = ["HTML", "CSS", "JS", "NodeJs", "ExpressJs"];


const applyInternship = async(iid)=>{

    const {data} = await axios.post(`http://localhost:8000/student/appliedinternship/${id}`,{
        iid
    })
    getAllInterships()
    const notify = () => toast.success('Applied Successfully, You can see the internship in applied section.', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    notify();
}

  return (
    <>

      {
        (internship == undefined)?"":internship.map((intern)=>(
            (intern.isBlocked)?"":
         ( <div key={intern.main._id}>
              <div className='internship_container_listingscompany'>
              <div className='top_section_internship_listingscompany'>
                <div className='left_section_internship_listingscompany'>
                  <h2>{intern.main.title}</h2>
                  <h4>{intern.companyname}</h4>
                </div>
                <div className='right_section_internship_listingscompany'>
                  <div className={intern.main.experience === "Beginner" ? 'experience_icon_container_listingscompany beginner_listingscompany' : (intern.main.experience === "Intermediate" ? 'experience_icon_container_listingscompany intermediate_listingscompany' : 'experience_icon_container_listingscompany expert_listingscompany')} >
                    <BsFillBarChartFill className="experience_icon_listingscompany" />

                     <p>{intern.main.experience}</p>
                    {intern.main.experience === "Beginner" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> atleast 1 project" />
                    )}

                    {intern.main.experience === "Intermediate" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> either 1 work experience OR 2 projects" />
                    )}
                    
                    {intern.main.experience === "Expert" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> both 1 work experience AND 2 projects" />
                    )}
              
                    <ReactTooltip place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800} data-event-off="click" multiline={true} />
                  </div>
                  <div className={(intern.main.status) ? 'active_icon_container' : 'false_icon_container'}>
                    <p>{(intern.main.status) ? "Active" : "Closed"}</p>
                   </div>
                </div>
              </div>
    
              <div className='mid_section_internship_listingscompany'>
                <div className='status_container_listingscompany'>
                  <div className={intern.main.experience === "Beginner" ? 'experience_icon_container2_listingscompany beginner_listingscompany' : (intern.main.experience === "Intermediate" ? 'experience_icon_container2_listingscompany intermediate_listingscompany' : 'experience_icon_container2_listingscompany expert_listingscompany')}>
                    <BsFillBarChartFill className="experience_icon_listingscompany" />
                    <p>{intern.main.experience}</p>
                    <AiOutlineInfoCircle className="info_icon_listingscompany" />
                  </div>
                  <div className={(intern.main.status) ? 'active_icon2_container' : 'false_icon2_container'}>
                    <p>{(intern.main.status) ? "Active" : "Closed"}</p>
                   </div>
                </div>
    
                 <div className='upper_mid_section_listingscompany'>
                  {intern.main.skills.map((value) => (
                  <div key={value} className="skill_section_listingscompany">
                    <p>{value}</p>
                  </div>
                  ))}
                </div>
                <div className='lower_mid_section_listingscompany'>
                  <div className='lower_top_listingscompany'>
                    <HiOutlineLocationMarker className='general_icons_listingscompany' />
                    <p>{intern.headquaters}</p>
                  </div>
     
                  <div className='lower_bottom_listingscompany'>
                    <div className='info_container_listingscompany'>
                      <div className='info_upper_container_listingscompany'>
                        <BsPlayCircle className='general_icons_listingscompany' />
                        <p>START DATE</p>
                      </div>
                      <div className='info_lower_container_listingscompany'>
                        <p>{intern.main.startfrom}</p>
                      </div>
                    </div>
    
                    <div className='info_container_listingscompany'>
                      <div className='info_upper_container_listingscompany'>
                        <IoCalendarClearOutline className='general_icons_listingscompany' />
                        <p>DURATION</p>
                      </div>
                      <div className='info_lower_container_listingscompany'>
                        <p>{intern.main.duration} months</p>
                      </div>
                    </div>
    
                    <div className='info_container_listingscompany'>
                      <div className='info_upper_container_listingscompany'>
                        <FaRegMoneyBillAlt className='general_icons_listingscompany' />
                        <p>STIPEND</p>
                      </div>
                      <div className='info_lower_container_listingscompany'>
                        <p>{intern.main.stipend.minimum} - {intern.main.stipend.maximum}</p>
                      </div>
                    </div>
    
                    <div className='info_container_listingscompany'>
                      <div className='info_upper_container_listingscompany'>
                        <AiOutlineFieldTime className='general_icons_listingscompany' />
                        <p>MODE</p>
                      </div>
                      <div className='info_lower_container_listingscompany'>
                        <p>{intern.main.jobmode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bottom_section_internship_listingscompany'>
               {(intern.main.status)?<button className='btn_primary_listingscompany' onClick={()=>applyInternship(intern.main._id)}>Apply</button>:<button className='btn_primary_listingscompany'>Closed</button>} 
                <Link to={`/company/internship/${intern.main._id}?cid=${intern.main.id}`}>View details &gt;</Link>
              </div>
    
            </div>        
        </div>
        )
        ))
      }

    </>
  )
}

export default InternshipContainerStudent
