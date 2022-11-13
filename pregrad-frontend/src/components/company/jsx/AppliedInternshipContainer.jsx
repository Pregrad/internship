import React,{useEffect,useState} from 'react';
import "../../../components/company/css/AppliedInternshipContainerStyles.css";
import { Link, useNavigate,useParams } from "react-router-dom";
import { BsFillBarChartFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from 'react-tooltip';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import axios from "axios";


const AppliedInternshipContainer = ({appliedinternship,getAppliedInternship}) => {

  const {id} = useParams()

    const navigate = useNavigate();

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
  
  const [reportingId,setReportingId] = useState("");
  const [reportingTitle,setReportingTitle] = useState("");

  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState("");
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
    
  const submitReport = async(e)=>{
    e.preventDefault(); 
    axios.post(`http://localhost:8000/internship/report/${reportingId}/${id}`,
      info
    ).then(({data})=>{
      if(data.error){
        setError(data.error);
      }
     else{
        setIsModal(!isModal);
      }
    })
    console.log(option1, ".",option2, ".",option3, ".",option4, ".", info)
    if(info.description){
      setError("")
    }else {
      setError("Description is required")
    }
  }

    useEffect(()=>{
      getAppliedInternship()
    },[])

    const getRepotingId = (id,title)=>{
      setReportingId(id);
      setReportingTitle(title);
      setIsModal(!isModal);
    }
    
    const cancelModal = () => {
      setIsModal(!isModal);
      setError("") 
      setOption1(false);
  setOption2(false);
 setOption3(false);
  setOption4(false);
    }

  return (
   <>
   {
     (appliedinternship == undefined)?"":appliedinternship.map((applied)=>(
      <div key={applied._doc._id}>
      <div className='internship_container_appliedinternship'>
          <div className='top_section_internship_appliedinternship'>
            <div className='left_section_internship_appliedinternship'>
              <h2>{applied._doc.title}</h2>
              <h4>{applied.companyname}</h4>
            </div>
            <div className='right_section_internship_appliedinternship'>
              <div className={applied._doc.experience === "Beginner" ? 'experience_icon_container_appliedinternship beginner_appliedinternship' : (applied._doc.experience === "Intermediate" ? 'experience_icon_container_appliedinternship intermediate_appliedinternship' : 'experience_icon_container_appliedinternship expert_appliedinternship')}>
                <BsFillBarChartFill className="experience_icon_appliedinternship" />
                <p>{applied._doc.experience}</p>
                {applied._doc.experience === "Beginner" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_appliedinternship" data-tip="The candidate should have<br /> atleast 1 project" />
                    )}

                    {applied._doc.experience === "Intermediate" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_appliedinternship" data-tip="The candidate should have<br /> either 1 work experience OR 2 projects" />
                    )}
                    
                    {applied._doc.experience === "Expert" && (
                       <AiOutlineInfoCircle  currentitem="false" className="info_icon_appliedinternship" data-tip="The candidate should have<br /> both 1 work experience AND 2 projects" />
                    )}
              
                    <ReactTooltip place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800} data-event-off="click" multiline={true} />
                  

              </div>
              <div className={(applied._doc.status) ? 'active_icon_container_appliedinternship' : 'false_icon_container_appliedinternship'}>
                <p>{(applied._doc.status) ? "Active" : "Closed"}</p>
              </div>

              <div className='report_icon_container_appliedinternship' onClick={() => getRepotingId(applied._doc._id,applied._doc.title)}>
                <MdOutlineReportGmailerrorred className="report_icon_appliedinternship"/>
              </div>
              {/* setIsModal(!isModal) */}
            </div>
          </div>

          <div className='mid_section_internship_appliedinternship'>
            <div className='status_container_appliedinternship'>
              <div className={applied._doc.experience === "Beginner" ? 'experience_icon_container2_appliedinternship beginner_appliedinternship' : (applied._doc.experience === "Intermediate" ? 'experience_icon_container2_appliedinternship intermediate_appliedinternship' : 'experience_icon_container2_appliedinternship expert_appliedinternship')}>
                <BsFillBarChartFill className="experience_icon_appliedinternship" />
                <p>{applied._doc.experience}</p>
                <AiOutlineInfoCircle className="info_icon_appliedinternship" />
              </div>

              <div className={(applied._doc.status) ? 'active_icon2_container_appliedinternship' : 'false_icon2_container'}>
                <p>{(applied._doc.status) ? "Active" : "Closed"}</p>
              </div>
            </div>

            <div className='upper_mid_section_appliedinternship'>
              {/* <div className="skill_section_appliedinternship">
                {
                applied._doc.applied.map((value)=>(
                  <p>{(value.id == id)?value.status:""}</p>
                ))
              }
              </div> */}
              {
                applied._doc.applied.map((value)=>(
                  (value.id === id) ? (<div key={value.id} className={value.status === "Applied" ? "skill_section_appliedinternship applied_status_appliedinternship" : (
                    value.status === "Hired" ? "skill_section_appliedinternship accepted_status_appliedinternship" : (value.status === "Rejected" ? "skill_section_appliedinternship rejected_status_appliedinternship" : "skill_section_appliedinternship shortlisted_status_appliedinternship")
                  ) }>
                    <p>{value.status}</p>
                  </div>) : ("")
                ))
              }
            </div>
          </div>

          <div className='bottom_section_internship_appliedinternship'>
            <p>Applied on 2nd Aug' 2022</p>
            <button onClick={() => navigate(`/company/internship/${applied._doc._id}?cid=${applied._doc.id}`)} className='btn_primary_appliedinternship'>View Details</button>
          </div>

{
  (applied._doc.isBlocked)?
  <div className='report_section_appliedinternship'>
     <p>This Internship has been blocked by us due to recurrent reports by students.</p>
  </div>:""
}
          

        </div>



      
        {isModal && (
        <div className='modal_backgound_appliedinternship'>
          <div className='modal_container2_appliedinternship'>
            <div className='modal_top_section_appliedinternship'>
              <h2>Report “{reportingTitle}” internship?</h2>
              <p>We are sorry to hear that you are reporting an internship. Can you tell us why?</p>
              {/* <p className="errors_msg_appliedinternship">{formErrors.others}</p> */}
            </div>
   
            <div className='modal_mid_section_appliedinternship'>
              <form>
                <div className="form_box_appliedinternship">
                    <div className="checkbox_container_appliedinternship">
                      <input type="checkbox" id="cb1" checked={option1} onClick={() => setOption1(!option1)} />
                      <label htmlFor="cb1"></label>
                      <p>False Information</p>
                    </div>
                    <div className="checkbox_container_appliedinternship">
                      <input type="checkbox" id="cb2" checked={option2} onClick={() => setOption2(!option2)} />
                      <label htmlFor="cb2"></label>
                      <p>Filled this position outside Pregrad</p>
                    </div>
                    <div className="checkbox_container_appliedinternship">
                      <input type="checkbox" id="cb3" checked={option3} onClick={() => setOption3(!option3)} />
                      <label htmlFor="cb3"></label>
                      <p>We are not hiring for this role anymore</p>
                    </div>
                    <div className="checkbox_container_appliedinternship">
                      <input type="checkbox" id="cb4" checked={option4} onClick={() => setOption4(!option4)} />
                      <label htmlFor="cb4"></label>
                      <p>Didn’t recieve good candidates for the internship</p>
                    </div>
                  </div>
  
                  <div className="form_box_appliedinternship">
                  <textarea name="description" rows={4} placeholder="Anything you want to add" onChange={handleForm}></textarea>
                  <p className='errors_msg_appliedinternship'>{error}</p>      
                </div>
  
                <div className='modal_bottom_section_appliedinternship'>
                   <button onClick={cancelModal} className='btn_light_appliedinternship'>Cancel</button>
                   <button type='submit' onClick={submitReport} className='btn_primary_appliedinternship'>Report Internship</button>
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

export default AppliedInternshipContainer
