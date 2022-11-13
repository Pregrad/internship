import React, { useState,useEffect } from 'react';
import "../../../components/admin/css/UserAdmin/VerificationStyles.css";
import { FiFileText } from 'react-icons/fi';
import PageLoader from "../../../img/page-loader.gif";
import { Link } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai';
import {useCookies} from 'react-cookie';
import {useNavigate,useParams}  from "react-router-dom";
import axios from "axios";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Verification = () => {

  const navigate = useNavigate();

  const {id} = useParams();
  
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [formErrors, setFormErrors] = useState();

  const [isContent, setIsContent] = useState(true);

  const [cookies,setCookie,removeCookie] = useCookies([]);

  const [unAuthorized,setUnAuthorized] = useState([]);

  let [count,setCount] = useState(0);

  const [showapplied,setShowApplied] = useState(unAuthorized);

  const changeAccepted = (id) => {
    setShowApplied(showapplied.map((e)=>{
      if(e._id === id){
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

    const changeRejected = (id) => {
      
      setShowApplied(showapplied.map((e)=>{
        if(e._id === id){
          if(e.status == false || e.status == undefined){
            setCount(++count)
            return {...e,status:true,class:"student_box_applicantscompany reject_applicantscompany"}
         }
         else 
         return e ;
        }else{
            return e;
         }
     }))
    }
    console.log(showapplied) ;

    const deleteRejectedApplicant = async()=>{
      
        const {data} = await axios.put(`http://localhost:8000/admin/verifiedCompany/${id}`,[
          ...showapplied
      ])
      if(data.status){
        getUnAuthorizedCompany();
        setCount(0);
      }
  }
  

  const getUnAuthorizedCompany = ()=>{
     axios.get(`http://localhost:8000/company/unauthorized`).then(({data})=>{
      if(data.length === 0){
        setIsContent(false);
        setUnAuthorized([]);
        setShowApplied([]);
      }
      else if(data){
        setUnAuthorized(data);
        setShowApplied(data);
      }
     })
  }

  useEffect(()=>{
    const verifyUser = async()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.post(`http://localhost:8000/admin/checkadmin`,{},{withCredentials:true}) 
        if(data.id !== id || data.status !== true){ 
          removeCookie("jwt")
          navigate('/login')
        }else{
          getUnAuthorizedCompany();
        }
      }
    }
    verifyUser();
  },[cookies,removeCookie,navigate])

  return (
    <div>
      <div className='sub_header_verification'>
        <h5>New Companies <span>({unAuthorized.length})</span></h5>
      </div>
      {isPageLoading ? (
        <div className='page_loading_container_projects'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_verification'>
          <div className='main_box_verification'>
            
          {isContent  && unAuthorized ?  (
             unAuthorized.map((unAuth)=>(
              <div className='student_box_applicantscompany' key={unAuth._id}>
              <div className='top_section_student_applicantscompany'>
                <h2>{unAuth.companyname}</h2>
                <Link target="_blank" to={`/company/resume/${unAuth._id}`}>
                <div className='search_icon_container_applicantscompany'>
                  <AiOutlineFileSearch className="search_icon_applicantscompany" />
                </div>
                </Link>
              </div>
              <div className='mid_section_applicantscompany'>
              <div className='mid_top_section_applicantscompany'>
              <div>
              <input type="radio" id={`accept${unAuth._id}`} name={`${unAuth._id}`} value={`accept${unAuth._id}`} onClick={()=>changeAccepted(unAuth._id)}/>
              <label htmlFor={`accept${unAuth._id}`}></label>
              <p>Verify</p>
            </div>
            <div>
              <input type="radio" id={`reject${unAuth._id}`} name={`${unAuth._id}`} value={`reject${unAuth._id}`} onClick={()=>changeRejected(unAuth._id)}/>
              <label htmlFor={`reject${unAuth._id}`}></label>
              <p>Block</p>
            </div>
             </div>
              </div>       
          </div>
             ))
          ) : (
            <div className='add_section1_verification'>
              <div className='add_section1_logo_verification'>
                <FiFileText size={30} className="add_section1_icon_verification" />
              </div>
              <div className='add_section1_details_verification'>
                <h2>No new companies available</h2>
                <p>No companies have been registered yet.</p>
              </div>
            </div>
          )}
          </div>
         
      </div>
      )}
      {/* */}
      {
        (unAuthorized.length > 0)?(
          <div className='delete_box_applicantscompany'  onClick={deleteRejectedApplicant}>
          <BsFillPatchCheckFill className="delete_icon_applicantscompany" />
           <p>Update Status (Block : {count})</p>
          </div>  
        ):null
      }
       
    </div>
  )
}

export default Verification
