import React,{useEffect,useState} from 'react';
import "../../../components/company/css/UserCompany/ProfileCompanyStyles.css";
import ProfileBackground from "../../../img/profile-background.jpg";
import { BsLinkedin } from "react-icons/bs";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate,useParams,Link } from 'react-router-dom';
import PageLoader from "../../../img/page-loader.gif";

const ProfileCompany = () => {


  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  const {id} = useParams()

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

      if(!cookies.jwt){
        navigate('/login')
      }else{
        axios.post(`http://localhost:8000/company`,{},{
          withCredentials:true,
        }).then(({data})=>{

          if(data.id != id){
            removeCookie("jwt")
            navigate('/login')
          }else{
            setIsPageLoading(true)
             getCompanyInfo()
             getCompanyDetails()
            navigate(`/company/info/${data.id}/profile`)
          } 
        })
      }
    }
  
    verifyCompany()  
  
  },[cookies,setCookie,removeCookie,navigate]);

  
  const initials = companydetails.companyname;
  const name_initials=typeof initials==="string" ?initials.split('')[0]:"";


  return (
    <div>
      {isPageLoading ? (
        <div className='page_loading_container_profilecompany'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className="main_container_profilecompany">
        <div className="welcome_container_profilecompany">
          <div className="welcome_left_section_profilecompany">
            <h4>Hi, welcome back!</h4>
            <p>Your Profile</p>
          </div>
          <div className="welcome_right_section_profilecompany">
            <h4>
              App <span>/ Profile</span>
            </h4>
          </div>
        </div>

        <div className="profile_container_profilecompany">
          <div className="profile_background_profilecompany">
            <img src={ProfileBackground} alt="background" />
            <div className="profile_edit2_container_profilecompany">
              <div className="profile_edit2_profilecompany">
                <a href={companyInfoDetails.linkedin} target="_blank"><BsLinkedin size={18} /></a>
              </div>
            </div>
          </div>

          <div className="profile_user_details_profilecompany">
            <div className="user_image_profilecompany">
              {name_initials}
            </div>
            <div className="profile_info_profilecompany">
              <div className="info_container_profilecompany">
                <div className="info_left_section_profilecompany">
                  <h5>{companydetails.companyname}</h5>
                  <p>{companyInfoDetails.typeofcompany}</p>
                </div>
                <div className="info_middle_section_profilecompany">
                  <h5>{companydetails.email}</h5>
                </div>
              </div>

              <div className="profile_edit_container_profilecompany">
                <div className="profile_edit_profilecompany">
                  <a href={companyInfoDetails.linkedin} target="_blank"><BsLinkedin /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='main_details_container_profilecompany'>
          <div className='main_details_left_section_profilecompany'>
            <div className='card_profilecompany'>
              <h4>Representative</h4>
              <div className="line_profilecompany"></div>
              <div className='owner_details_container'>
                <h3>{companydetails.name}</h3>
                <p>{companydetails.designation}</p>
              </div>
            </div>
          </div>

          <div className='main_details_right_section_profilecompany'>
            <div className='card_profilecompany'>
            <h4>About Company</h4>
              <div className="line_profilecompany"></div>
              <div className='owner_details_container'>
                <h3>Location | Established In</h3>
                <p>{companyInfoDetails.headquaters} | {companyInfoDetails.established}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='card_profilecompany'>
              <h4>Description of Company</h4>
              <div className="line_profilecompany"></div>
              <div className='owner_details_container'>
                <p>{companyInfoDetails.description}.</p>
              </div>
            </div>
      </div>
      )}
    </div>
  )
}

export default ProfileCompany
