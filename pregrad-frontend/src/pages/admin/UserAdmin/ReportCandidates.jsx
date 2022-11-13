import React, { useState,useEffect } from 'react';
import "../../../components/admin/css/UserAdmin/ReportCandidatesStyles.css";
import { FiFileText } from 'react-icons/fi';
import PageLoader from "../../../img/page-loader.gif";
import { Link,useParams,useNavigate } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai';
import axios from "axios";
import {useCookies} from 'react-cookie';

const ReportCandidates  = () => {

  const {id,i_id} = useParams();

  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isContent, setIsContent] = useState(true);

  const [reports,setReports] = useState([])

  const getReports = ()=>{
    axios.get(`http://localhost:8000/admin/getreports/${i_id}`).then(({data})=>{
      if(data){
        console.log(data);
        setReports(data);
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
          removeCookie("jwt");
          navigate('/login');
        }else{
          getReports();
        }
      }
    }
    verifyUser();
  },[])

  return (
    <div>
      <div className='sub_header_reportcandidates '>
        <h5>Report Candidates <span>({reports.length})</span></h5>
      </div>

      {isPageLoading ? (
        <div className='page_loading_container_reportcandidates '>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_reportcandidates '>
          <div className='main_box_reportcandidates '>
            
          {isContent && reports ?  (
            reports.map((report)=>(
      <div className='student_box_reportcandidates ' key={report.student_id}>
            <div className='top_section_student_reportcandidates '>
              <h2>{report.name}</h2>
              <Link target="_blank" to={`/resume/${report.student_id}`}>
              <div className='search_icon_container_reportcandidates '>
                <AiOutlineFileSearch className="search_icon_reportcandidates " />
              </div>
              </Link>
            </div>
            <div className='mid_section_reportcandidates '>
              <p><span>Report Reason - </span>{report.description}</p>
            </div>       
        </div>
            ))
            
          ) : (
            <div className='add_section1_reportcandidates '>
              <div className='add_section1_logo_reportcandidates '>
                <FiFileText size={30} className="add_section1_icon_reportcandidates " />
              </div>
              <div className='add_section1_details_reportcandidates '>
                <h2>No new companies available</h2>
                <p>No companies have been registered yet.</p>
              </div>
            </div>
          )}
          </div>
         
      </div>
      )}
    </div>
  )
}

export default ReportCandidates  
