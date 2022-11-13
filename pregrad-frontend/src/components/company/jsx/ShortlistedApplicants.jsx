import React, { useState,useEffect } from 'react';
import "../../../components/company/css/UserCompany/ApplicantsCompanyStyles.css";
import { FiFileText } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";
import axios from 'axios'

const ShortlistedApplicants = ({shortlistedCandidates,showApplicants,shortlistedState}) => {

  const navigate = useNavigate();

  var iid = window.location.search.substring(1).split("=")[1];
  
  const [isContent, setIsContent] = useState(true);

  const [showapplied,setShowApplied] = useState(shortlistedCandidates)

  let [totalApplied,setTotalApplied] = useState(0)

  let [count,setCount] = useState(0)

  const changeAccepted = (id) => {
    setShowApplied(showapplied.map((e)=>{
      if(e.id === id){
       if(e.status === true){
        setCount(--count)
         return {...e,status:false,class:"student_box_applicantscompany accept_applicantscompany"}
       }else{
         return {...e,status:false,class:"student_box_applicantscompany accept_applicantscompany"}
       }
      }else{
         return e;
      }
  }))
       }
 
  
  const countApplied= ()=>{
        let applied_count = 0
        showapplied.map((e)=>{
            if(e.status){
              setCount(++applied_count);
            }
        })
    }
    
    useEffect(()=>{
      countApplied() 
    },[]) 

    useEffect(()=>{
        shortlistedState(showapplied)
    },[showapplied])

  useEffect(()=>{
   
    setShowApplied(shortlistedCandidates)
},[shortlistedCandidates])


  const changeRejected = (id) => {
    setShowApplied(showapplied.map((e)=>{
       if(e.id === id){
          setCount(++count)
          return {...e,status:true,class:"student_box_applicantscompany reject_applicantscompany"}
       }else{
          return e;
       }
   }))
  }

  const deleteRejectedApplicant = async()=>{

      const {data} = await axios.put(`http://localhost:8000/company/rejectedapplicants/${iid}?type=Hired`,[
        ...showapplied
    ])
    if(data.status){
      showApplicants()
      setCount(0)
    }
}


  return (
    <div className='shortlistedapplicants_box_applicantscompany'>
     {
  showapplied.map((application)=>(
    (application.internshipstatus === "Shortlisted"?(
      <div className={application.status == undefined ? "student_box_applicantscompany":(application.status == true?application.class:application.class)} key={application.id}>
      <div className='top_section_student_applicantscompany'>
        <h2>{application.name}</h2>
        <Link target="_blank" to={`/resume/${application.id}`}>
        <div className='search_icon_container_applicantscompany'>
          <AiOutlineFileSearch className="search_icon_applicantscompany" />
        </div>
        </Link>
      </div>
      <div className='mid_section_applicantscompany'>
      <div className='mid_top_section_applicantscompany'>
            <div>
              <input type="radio" id={`accept${application.id}`} name={`${application.id}`} onClick={()=>changeAccepted(application.id)} value={`accept${application.id}`} checked={application.status === false ? true:false}/>
              <label htmlFor={`accept${application.id}`}></label>
              <p>Hire</p>
            </div>
            <div>
              <input type="radio" id={`reject${application.id}`} name={`${application.id}`} onClick={()=>changeRejected(application.id)} value={`reject${application.id}`} disabled={(application.status === undefined)?false:(application.status === true)?true:false} checked={application.status}/>
              <label htmlFor={`reject${application.id}`}></label>
              <p>Reject</p>
            </div>
          </div>
      </div>       
  </div>
    ):"")
  ))
   }

   <div className='delete_box_applicantscompany' onClick={deleteRejectedApplicant}>
  <BsFillPatchCheckFill className="delete_icon_applicantscompany" />
           <p>Update Status (Rejected : {count})</p>
    </div>   
     </div>
  )
}

export default ShortlistedApplicants;
