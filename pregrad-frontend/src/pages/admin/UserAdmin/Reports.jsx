import React, { useState,useEffect } from 'react';
import "../../../components/admin/css/UserAdmin/ReportsStyles.css";
import { FiFileText } from 'react-icons/fi';
import PageLoader from "../../../img/page-loader.gif";
import { Link,useNavigate,useParams } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai';
import axios from "axios";
import {useCookies} from 'react-cookie';
import { BsFillPatchCheckFill } from "react-icons/bs";

const Reports = () => {

  const navigate = useNavigate();

  const {id} = useParams();

  const [cookies,setCookie,removeCookie] = useCookies([]);

  const [isPageLoading, setIsPageLoading] = useState(false);
  
  const [isContent, setIsContent] = useState(true);

  const [reportedInternships,setReportedInternships] = useState([]);

  let [count,setCount] = useState(0);

  const [showapplied,setShowApplied] = useState([]);

  const getReportedInternships = ()=>{
      axios.get("http://localhost:8000/admin/reportedinternships").then(({data})=>{
        if(data.length === 0){
          setIsContent(false);
          setReportedInternships([]);
          setShowApplied([]);
        }
       else if(data){
          setReportedInternships(data);
          setShowApplied(data);
        }
      })
  }

  const changeAccepted = (id) => {
    setShowApplied(showapplied.map((e)=>{
      if(e._id === id){
        if(e.flag === true){
          setCount(--count);
          return {...e,flag:false,class:"student_box_applicantscompany accept_applicantscompany"}
        }else{
          return {...e,flag:false,class:"student_box_applicantscompany accept_applicantscompany"}
        }
      }else{
        return e;
      }
    }
    ))
    
  }

  
  const countApplied= ()=>{
        let applied_count = 0;
        showapplied.map((e)=>{
            if(e.flag){
              setCount(++applied_count);
            }
        })
    }

  const changeRejected = (id) => {
    setShowApplied(showapplied.map((e)=>{
      
      if(e._id === id){ 
        if(e.flag == false || e.flag == undefined){
          setCount(++count)
          return {...e,flag:true,class:"student_box_verification reject_applicantscompany"} ;
        }else{
          return e ;
        } 
       }else{
          return e;
       }
   }))
  }

  const deleteRejectedApplicant = async()=>{
    
      const {data} = await axios.put(`http://localhost:8000/admin/verifiedreportedinternship/${id}`,[
        ...showapplied
    ])
    if(data.status){
      getReportedInternships(); 
      setCount(0);
    }
}
// useEffect(()=>{
//   countApplied();
// },[count])

  useEffect(()=>{
    const verifyUser = async()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.post(`http://localhost:8000/admin/checkadmin`,{},{withCredentials:true}) 
        if(data.id !== id || data.status !== true){ 
          removeCookie("jwt");
          navigate('/login');
        }else{
          getReportedInternships();
        }
      }
    }
    verifyUser();
  },[])

  return (
    <div>
      <div className='sub_header_verification'>
        <h5>New Reports <span>({reportedInternships.length})</span></h5>
      </div>
      
      { isPageLoading ? (
        <div className='page_loading_container_verification'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_verification'>
          <div className='main_box_verification'>
          {isContent && reportedInternships ?  (
            reportedInternships.map((reported)=>(
      <div className='student_box_verification' key={reported._id}>
            <div className='top_section_student_verification'>
              <h2>{reported.title}</h2>
              <div className='top_left_section_verification'>
                <Link target="_blank" to={`/admin/info/${id}/reports/candidates/${reported._id}`} className='reports_link_verification'>
                  <p>View Reports</p>
                </Link>
                <Link target="_blank" to={`/company/internship/${reported._id}?cid=${reported.id}`}>
                  <div className='search_icon_container_verification'>
                    <AiOutlineFileSearch className="search_icon_verification" />
                  </div>
                </Link>
              </div>
            </div>
            <div className='mid_section_verification'>
                <div className='mid_top_section_verification'>
                <div>
              <input type="radio" id={`accept${reported._id}`} name={`${reported._id}`} value={`accept${reported._id}`} onClick={()=>changeAccepted(reported._id)}/>
              <label htmlFor={`accept${reported._id}`}></label>
              <p>Allow</p>
            </div>
            <div>
              <input type="radio" id={`reject${reported._id}`} name={`${reported._id}`} value={`reject${reported._id}`} onClick={()=>changeRejected(reported._id)}/>
              <label htmlFor={`reject${reported._id}`}></label>
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
                <h2>No new reports available</h2>
                <p>No internship have been reported yet.</p>
              </div>
            </div>
          )}
          </div>
         
      </div>
      )}
      {
         (reportedInternships.length > 0)?(
          <div className='delete_box_applicantscompany'  onClick={deleteRejectedApplicant}>
          <BsFillPatchCheckFill className="delete_icon_applicantscompany" />
           <p>Update Status (Block : {count})</p>
        </div> 
    ):null
      }
       
    </div>
  )
}

export default Reports
