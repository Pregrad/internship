import React, { useEffect, useState, useRef } from 'react';
import "../css/UserCompany/ListingsCompanyStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBarChartFill, BsPlayCircle } from "react-icons/bs";
import { AiOutlineFieldTime, AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlinePencil } from "react-icons/hi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FiClipboard } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import ReactTooltip from 'react-tooltip';

const InternshipContainerCompany = ({internship,companyinfodetail,companydetail,getinternship}) => {

    const ref = useRef();

    const navigate = useNavigate();

    const skillsData = ["HTML", "CSS", "JS", "NodeJs", "ExpressJs"];

    const [isModal, setIsModal] = useState(false);

    const [isModal2, setIsModal2] = useState(false);
   
    const [modalId,setModalId] = useState();

    const [status,setStatus] = useState(true);
    

    const [info, setInfo] = useState({
      description: ""
    })

    const handleForm = (event) => {
      const {name, value} = event.target;
      setInfo({
        ...info,
        [name]: value
      })
    }
  
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);

    useEffect(() => {
      const checkIfClickedOutside = e => {
        if (isModal && ref.current && !ref.current.contains(e.target)) {
          setIsModal(false)
        }
      }
      document.addEventListener("click", checkIfClickedOutside)
     
      return () => {
        document.removeEventListener("click", checkIfClickedOutside)
      }  
    }, [isModal,isModal2]) 

    const openModal = (id)=>{
      setModalId(id)
      setIsModal(!isModal)
    }

    const closeInternshipModal = (id)=>{
      setModalId(id)
      setIsModal2(!isModal2)
    }

    const internStatus = ()=>{
        getinternship()
        setIsModal2(!isModal2)
        setIsModal(!isModal)
      
    }

    const [error, setError] = useState("");

    const updateInternshipstatus = async(e,iid,status)=>{
        e.preventDefault();
        if(option1 || option2 || option3 || option4){
          const {data} = await axios.put(`http://localhost:8000/company/closeinternship/${iid}`,{
            status
          })
          if(data.message){
            internStatus()
          }
        }else {
          setError("Reason required");
        }
}

  return (
    <>
    {
      internship.map((intern)=>(
      <div  key={intern._id}>
          <div className='internship_container_listingscompany'>
          <div className='top_section_internship_listingscompany'>
            <div className='left_section_internship_listingscompany'>
              <h2>{intern.title}</h2>
              <h4>{companydetail.companyname}</h4>
            </div>
            <div className='right_section_internship_listingscompany'>
              <div className={intern.experience === "Beginner" ? 'experience_icon_container_listingscompany beginner_listingscompany' : (intern.experience === "Intermediate" ? 'experience_icon_container_listingscompany intermediate_listingscompany' : 'experience_icon_container_listingscompany expert_listingscompany')}>
                <BsFillBarChartFill className="experience_icon_listingscompany" />
                <p>{intern.experience}</p>
                {intern.experience === "Beginner" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> atleast 1 project" />
                    )}

                    {intern.experience === "Intermediate" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> either 1 work experience OR 2 projects" />
                    )}
                    
                    {intern.experience === "Expert" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_listingscompany" data-tip="The candidate should have<br /> both 1 work experience AND 2 projects" />
                    )}
              
                    <ReactTooltip place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800} data-event-off="click" multiline={true} />
              </div>
              <div className={(intern.status || (intern.status && status )) ? 'active_icon_container' : 'false_icon_container'}>
                <p>{(intern.status || (intern.status && status )) ? "Active" : "Closed"}</p>
              </div>
              <div className='dots_icon_container_listingscompany' id={intern._id}>
                <BiDotsVerticalRounded onClick={()=>openModal(intern._id)} id={intern._id}  className="dots_icon_listingscompany" />
              </div>
              {(modalId == intern._id && isModal) && (
                <div className='modal_container_listingscompany'>
                  <div className='modal_box_listingscompany'>
                    <FiClipboard className="modal_icon_listingscompany" />
                    <p onClick={() => navigate(`/company/internship/${intern._id}?cid=${intern.id}`)}>View Details</p>
                  </div>
                  <div className='modal_box_listingscompany' onClick={()=>navigate(`/company/info/${intern.id}/addinternship?type=editinternship&iid=${intern._id}`)}>
                    <HiOutlinePencil className="modal_icon_listingscompany" />
                    <p>Edit Internship</p>
                  </div>
                  <div className='modal_box_listingscompany'>
                    <IoMdClose className="modal_icon_listingscompany" />
                    <p onClick={()=>closeInternshipModal(intern._id)}>Close Internship</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='mid_section_internship_listingscompany'>
            <div className='status_container_listingscompany'>
              <div className={intern.experience === "Beginner" ? 'experience_icon_container2_listingscompany beginner_listingscompany' : (intern.experience === "Intermediate" ? 'experience_icon_container2_listingscompany intermediate_listingscompany' : 'experience_icon_container2_listingscompany expert_listingscompany')}>
                <BsFillBarChartFill className="experience_icon_listingscompany" />
                <p>{intern.experience}</p>
                <AiOutlineInfoCircle className="info_icon_listingscompany" />
              </div>

              <div className={(intern.status || (intern.status && status )) ? 'active_icon2_container' : 'false_icon2_container'}>
                <p>{(intern.status || (intern.status && status )) ? "Active" : "Closed"}</p>
              </div>
            </div>

            <div className='upper_mid_section_listingscompany'>
              {intern.skills.map((value) => (
              <div key={value} className="skill_section_listingscompany">
                <p>{value}</p>
              </div>
              ))}
            </div>

            <div className='lower_mid_section_listingscompany'>
              <div className='lower_top_listingscompany'>
                <HiOutlineLocationMarker className='general_icons_listingscompany' />
                <p>{companyinfodetail.headquaters}</p>
              </div>
 
              <div className='lower_bottom_listingscompany'>
                <div className='info_container_listingscompany'>
                  <div className='info_upper_container_listingscompany'>
                    <BsPlayCircle className='general_icons_listingscompany' />
                    <p>START DATE</p>
                  </div>
                  <div className='info_lower_container_listingscompany'>
                    <p>{intern.startfrom}</p>
                  </div>
                </div>

                <div className='info_container_listingscompany'>
                  <div className='info_upper_container_listingscompany'>
                    <IoCalendarClearOutline className='general_icons_listingscompany' />
                    <p>DURATION</p>
                  </div>
                  <div className='info_lower_container_listingscompany'>
                    <p>{intern.duration} months</p>
                  </div>
                </div>

                <div className='info_container_listingscompany'>
                  <div className='info_upper_container_listingscompany'>
                    <FaRegMoneyBillAlt className='general_icons_listingscompany' />
                    <p>STIPEND</p>
                  </div>
                  <div className='info_lower_container_listingscompany'>
                    <p>{intern.stipend.minimum} - {intern.stipend.maximum}</p>
                  </div>
                </div>

                <div className='info_container_listingscompany'>
                  <div className='info_upper_container_listingscompany'>
                    <AiOutlineFieldTime className='general_icons_listingscompany' />
                    <p>MODE</p>
                  </div>
                  <div className='info_lower_container_listingscompany'>
                    <p>{intern.jobmode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bottom_section_internship_listingscompany'>
            <button onClick={() => navigate(`/company/info/${intern.id}/applicants?iid=${intern._id}`)} className='btn_primary_listingscompany'>View Applications</button>
            <Link to={`/company/internship/${intern._id}?cid=${intern.id}`}>View details &gt;</Link>
          </div>
          {
            (intern.isBlocked)?
            <div className='report_section_listingscompany'>
            <p>This Internship has been blocked by us due to recurrent reports by students.</p>
          </div>:""
          }
          

        </div>
      

            

            {(modalId == intern._id && isModal2) && (
        
        <div className='modal_backgound_listingscompany'>
        <div className='modal_container2_listingscompany'>
          <div className='modal_top_section_listingscompany'>
            <h2>Close “{intern.title}” internship?</h2>
            <p>We are sorry to hear that you are Cancelling your internship. Can you tell us why?</p>
            {/* <p className="errors_msg_listingscompany">{formErrors.others}</p> */}
          </div>
 
          <div className='modal_mid_section_listingscompany'>
            <form>
              <div className="form_box_listingscompany">
                  <div className="checkbox_container_listingscompany">
                    <input type="checkbox" id="cb1" onClick={() => setOption1(!option1)} />
                    <label htmlFor="cb1"></label>
                    <p>Filled this position on Pregrad</p>
                  </div>
                  <div className="checkbox_container_listingscompany">
                    <input type="checkbox" id="cb2" onClick={() => setOption2(!option2)} />
                    <label htmlFor="cb2"></label>
                    <p>Filled this position outside Pregrad</p>
                  </div>
                  <div className="checkbox_container_listingscompany">
                    <input type="checkbox" id="cb3" onClick={() => setOption3(!option3)} />
                    <label htmlFor="cb3"></label>
                    <p>We are not hiring for this role anymore</p>
                  </div>
                  <div className="checkbox_container_listingscompany">
                    <input type="checkbox" id="cb4" onClick={() => setOption4(!option4)} />
                    <label htmlFor="cb4"></label>
                    <p>Didn’t recieve good candidates for the internship</p>
                  </div>
                  <p className='errors_msg_listingscompany'>{error}</p>
                </div>

                <div className="form_box_listingscompany">
                <textarea name="description" rows={4} placeholder="Anything you want to add" onChange={handleForm}></textarea>      
              </div>

              <div className='modal_bottom_section_listingscompany'>
                 <button onClick={() => setIsModal2(!isModal2)} className='btn_light_listingscompany'>Cancel</button>
                 <button type='submit' onClick={(e)=>updateInternshipstatus(e,intern._id,intern.status)} className='btn_primary_listingscompany'>Close Internship</button>
              </div>
            </form>
          </div>
         </div>
      </div>
       
      )}
    </div>

))
}
</>
  )
}

export default InternshipContainerCompany
