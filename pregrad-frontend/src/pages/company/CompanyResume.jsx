import React,{useEffect,useState} from 'react';
import "../../components/company/css/CompanyResumeStyles.css";
import ProfileBackground from "../../img/profile-background.jpg";
import { BsLinkedin } from "react-icons/bs";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate,useParams,Link } from 'react-router-dom';
import PageLoader from "../../img/page-loader.gif";

const CompanyResume = () => {


  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  const {id} = useParams();

  // console.log(id);

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [companydetails,setCompanyDetails] = useState({})
 
  const [companyInfoDetails,setCompanyInfoDetails] = useState({})

  const getCompanyInfo = ()=>{
    axios.get(`http://localhost:8000/company/getcompanyinfo/${id}`).then(({data})=>{
    setCompanyDetails(data)
})
}

const getCompanyDetails = ()=>{
  axios.get(`http://localhost:8000/company/getcompanydetails/${id}`).then(({data})=>{
   setCompanyInfoDetails(data)
   setTimeout(() => {
    setIsPageLoading(false)
  },800)
})
}


  useEffect(() => {

    const verifyCompany = ()=>{

            setIsPageLoading(true)
             getCompanyInfo()
             getCompanyDetails()
            // navigate(`/company/info/${data.id}/profile`)
      }
    verifyCompany()  
  
  },[cookies,setCookie,removeCookie,navigate]);

  
  const initials = companydetails.companyname
  const name_initials=typeof initials==="string" ?initials.split('')[0]:""


  return (
    <div>
      {isPageLoading ? (
        <div className='page_loading_container_companyresume'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className="main_container_companyresume">
        <div className="welcome_container_companyresume">
          <div className="welcome_left_section_companyresume">
            <h4>Hi, welcome back!</h4>
            <p>Your Profile</p>
          </div>
          <div className="welcome_right_section_companyresume">
            <h4>
              App <span>/ Profile</span>
            </h4>
          </div>
        </div>

        <div className="profile_container_companyresume">
          <div className="profile_background_companyresume">
            <img src={ProfileBackground} alt="background" />
            <div className="profile_edit2_container_companyresume">
              <div className="profile_edit2_companyresume">
                <a href={companyInfoDetails.linkedin}><BsLinkedin size={18} /></a>
              </div>
            </div>
          </div>

          <div className="profile_user_details_companyresume">
            <div className="user_image_companyresume">
              {name_initials}
            </div>
            <div className="profile_info_companyresume">
              <div className="info_container_companyresume">
                <div className="info_left_section_companyresume">
                  <h5>{companydetails.companyname}</h5>
                  <p>{companyInfoDetails.typeofcompany}</p>
                </div>
                <div className="info_middle_section_companyresume">
                  <h5>{companydetails.email}</h5>
                </div>
              </div>

              <div className="profile_edit_container_companyresume">
                <div className="profile_edit_companyresume">
                  <a href={companyInfoDetails.linkedin}><BsLinkedin /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='main_details_container_companyresume'>
          <div className='main_details_left_section_companyresume'>
            <div className='card_companyresume'>
              <h4>Representative</h4>
              <div className="line_companyresume"></div>
              <div className='owner_details_container_companyresume'>
                <h3>{companydetails.name} | <span>({companydetails.phoneno})</span></h3>
                <p>{companydetails.designation}</p>
              </div>
            </div>
          </div>

          <div className='main_details_right_section_companyresume'>
            <div className='card_companyresume'>
            <h4>About Company</h4>
              <div className="line_companyresume"></div>
              <div className='owner_details_container_companyresume'>
                <h3>Location | Established In</h3>
                <p>{companyInfoDetails.headquaters} | {companyInfoDetails.established}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='card_companyresume'>
              <h4>Description of Company</h4>
              <div className="line_companyresume"></div>
              <div className='owner_details_container_companyresume'>
                <p>{companyInfoDetails.description}.</p>
              </div>
            </div>
      </div>
      )}
    </div>
  )
}

export default CompanyResume 
