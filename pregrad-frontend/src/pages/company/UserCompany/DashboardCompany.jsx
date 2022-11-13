import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { useNavigate, Link,useParams } from 'react-router-dom';
import "../../../components/company/css/UserCompany/DashboardCompanyStyles.css";
import axios from 'axios'
import {useCookies} from 'react-cookie';
import PageLoader from "../../../img/page-loader.gif";
import ReactTooltip from 'react-tooltip';


const DashboardCompany = () => {
  
  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  const [isPageLoading, setIsPageLoading] = useState(false);

  const {id} = useParams()
  
  const [companydetails,setCompanyDetails] = useState({})
 
  const [companyInfoDetails,setCompanyInfoDetails] = useState({})

  // EDIT FORM 1
  const [isModal, setIsModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const locationData = ["Delhi, New Delhi", "Mumbai", "Chennai", "Jaipur", "Hyderabad"]
  const [selectedLocation, setSelectedLocation] = useState("");
 
  const handleLocation = (event) => {
    setSelectedLocation(event.target.value);
  }

  const typeData = ["StartUp", "Private Limited Company", "Public Company", "Business Corporation", "Government Agency", "Not Registered Organisation"]
  const [selectedType, setSelectedType] = useState("");
 
  const handleType = (event) => {
    setSelectedType(event.target.value);
  }

  const [companyInfo, setCompanyInfo] = useState({
    linkedinlink: "",
    websitelink: "",
    about: ""
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value
    })
   
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(companyInfo));
    setIsSubmit(true);
     
  }

  const validate = (values) => {
    const errors = {};

    if(!values.linkedinlink){
      errors.linkedinlink = "Linkedin Id required"
    }

    if(!selectedLocation){
      errors.location = "Location required"
    }

    if(!selectedType){
      errors.type = "Company Type required"
    }

    if(!values.about){
      errors.about = "About company required"
    }

    return errors;
  }


  const [isModal2, setIsModal2] = useState(false);
  const [formErrors2, setFormErrors2] = useState({});
  const [isSubmit2, setIsSubmit2] = useState(false);

  const [accountInfo, setAccountInfo] = useState({
    name: "",
    companyname: "",
    designation: "", 
    mobile: "",
  });

  const handleForm2 = (e) => {
    const {name, value} = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value
    })
   
  }

  const submitForm2 = (e) => {
    e.preventDefault();
    setFormErrors2(validate2(accountInfo));
    setIsSubmit2(true);
  }

  const validate2 = (values) => {
    const errors = {};

    if(!values.name){
      errors.name = "Name Required"
    }else if(values.name.length < 3){
      errors.name = "Minimum 3 characters required" 
    }else if(values.name.length > 18){
      errors.name = "Maximum 18 characters required";
    }

    if(!values.companyname){
      errors.companyname = "Company name required"
    }else if(values.companyname.length < 2){
      errors.companyname = "Minimum 2 characters required"
    }else if(values.companyname.length > 18){
      errors.companyname = "Maximum 18 characters required";
    }
    
    if(!values.designation){
      errors.designation = "Designation required"
    }else if(values.designation.length > 20){
      errors.designation = "Maximum 20 characters required";
    }

    if(!values.mobile){
      errors.mobile = "Mobile number required"
    }else if(values.mobile.toString().length !== 10){
      errors.mobile = "Mobile number is Invalid";
    }

    return errors;
  }

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
        setIsPageLoading(true)
        axios.post(`http://localhost:8000/company`,{},{
          withCredentials:true,
        }).then(({data})=>{

          if(data.id != id){
            removeCookie("jwt")
            navigate('/login')
          }else{
            
             getCompanyInfo()
             getCompanyDetails()
            // navigate(`/company/info/${id}/dashboard`)
          } 
        })
      }
    }
  
    verifyCompany()  
  
    if( Object.keys(formErrors).length === 0 && isSubmit ){
        axios.put(`http://localhost:8000/company/editprofile/${id}`,{
          ...editDetailsProfile
        }).then(({data})=>{
          if(data.message){
            setIsModal(!isModal)
            setIsSubmit(false)
          }
          else{
            setFormErrors(data.errors);
          }
        })
    }

    if(Object.keys(formErrors2).length == 0 && isSubmit2){
      axios.put(`http://localhost:8000/company/editaccount/${id}`,{
        ...accountInfo
      }).then(({data})=>{
        if(data.message){
          setIsModal2(!isModal2)
          setIsSubmit2(false)
          getCompanyInfo()
          getCompanyDetails()
        }
        else{
          setFormErrors(data.errors);
          setIsSubmit2(false)
        }
    })
  }
  },[formErrors, formErrors2,cookies,setCookie,removeCookie]);

  const initials = companydetails.companyname
  const name_initials=typeof initials==="string" ?initials.split('')[0]:""


  const setEditProfile = ()=>{
    setIsModal(!isModal)
    setCompanyInfo({...companyInfo,linkedinlink:companyInfoDetails.linkedin,websitelink:companyInfoDetails.websitelink,
    about:companyInfoDetails.description })
    setSelectedLocation(companyInfoDetails.headquaters)
    setSelectedType(companyInfoDetails.typeofcompany)
  }

  const editDetailsProfile = {
    companyInfo,
    selectedLocation,
    selectedType
  }

  const editAccountDetails = ()=>{
    setIsModal2(!isModal2);
    setAccountInfo({...accountInfo,
    name:companydetails.name,
    companyname:companydetails.companyname,
    designation:companydetails.designation, 
    mobile: companydetails.phoneno
  })
  }

  const closeForm2 = ()=>{

    setIsModal2(!isModal2);
    setIsSubmit2(false);
    setFormErrors2({});
  } 

  const closeForm = ()=>{
    setIsModal(!isModal);
    setIsSubmit(false);
    setFormErrors({});
  } 


  return (
    <div>
      {isPageLoading ? (
        <div className='page_loading_container_dashboardCompany'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_dashboardCompany'>
        <div className='left_section_container_dashboardCompany'>
          <div className='top_details_section_dashboardCompany'>
            <div className='left_details_section_dashboardCompany'>
              <div className='logo_container_dashboardCompany'>
                {name_initials}
              </div>
              <div className='info_container_dashboardCompany'>
                <h2>{companydetails.companyname}</h2>
                <p>{companyInfoDetails.typeofcompany} , {companyInfoDetails.headquaters}</p>
              </div>
              <HiOutlinePencil onClick={setEditProfile} className="edit_icon2_dashboardCompany" />
            </div>

            <div className='right_details_section_dashboardCompany'>
              <HiOutlinePencil onClick={setEditProfile} className="edit_icon_dashboardCompany" data-tip data-for="editProfile" />
              <ReactTooltip id="editProfile" place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800}>
                <span>Edit company's profile</span>
              </ReactTooltip>
              <button onClick={() => navigate(`/company/info/${id}/profile`)} className='btn_primary_profile_dashboardCompany'>View Profile</button>
            </div>
          </div>

          <div className='mid_details_section_dashboardCompany'>
            <div className='account_container_dashboardCompany'>
              <div className='top_box_account_dashboardCompany'>
                <div>
                  <FiSettings className='settings_icon_dashboardCompany' />
                  <h2>Account Settings</h2>
                </div>
                <p onClick={editAccountDetails} data-tip data-for="editAccount">Change</p>
                <ReactTooltip id="editAccount" place="bottom" data-background-color="#1E272E" effect="solid" delayShow={800}>
                  <span>Edit account details</span>
                </ReactTooltip>
              </div>
              <div className='bottom_box_account_dashboardCompany'>
                <p>Change your name, location, company type, etc. from here.</p>
              </div>
            </div>

            <div className='applicants_container_dashboardCompany'>
              <div className='top_box_applicants_dashboardCompany'>
                <div>
                  <MdOutlinePeopleAlt className='people_icon_dashboardCompany' />
                  <h2>New Applicants&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                </div>
                <Link to={`/company/info/${id}/listings`}>View</Link>
              </div>
              <div className='bottom_box_applicants_dashboardCompany'>
                <p>Check new applicants applied for your internship post.&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
            </div>
          </div>
        </div>

        <div className='right_section_container_dashboardCompany'>
          <div className='top_tc_section_dashboardCompany'>
            <h2>Important T&C Update</h2>
            <p>If you hire any candidate from Pregrad, it is mandatory to Send Offer from the platform. If you do not do so, we may take some action and you won't be allowed to use our services further.</p>
          </div>
        </div>
      </div>
      )}
      


      {isModal && (
        
        <div className='modal_backgound_dashboardCompany'>
        <div className='modal_container_dashboardCompany'>
          <div className='modal_top_section_dashboardCompany'>
            <h2>Edit Profile</h2>
            <p className="errors_msg_dashboardCompany">{formErrors.others}</p>
          </div>
 
          <div className='modal_mid_section_dashboardCompany'>
            <form>
              <div className="form_box_dashboardCompany">
                <label>Linkedin*</label>
                <input type="url" name="linkedinlink" placeholder="Linkedin Id" defaultValue={companyInfoDetails.linkedin} onChange={handleForm} />
                <p className="errors_msg_dashboardCompany">{formErrors.linkedinlink}</p>
              </div>

              <div className="form_box_dashboardCompany">
                <label>Website Link</label>
                <input type="url" name="websitelink" defaultValue={companyInfoDetails.websitelink} placeholder="Your Website Link" onChange={handleForm} />
                <p className="errors_msg_dashboardCompany">{formErrors.websitelink}</p>
              </div>

              <div className="form_box_dashboardCompany">
                   <label>Location of Headquarters</label>
                   <select onChange={handleLocation} className="select_dashboardCompany">
                    <option value="" disabled selected hidden>{companyInfoDetails.headquaters}</option> 
                    {locationData.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                   <p className="errors_msg_dashboardCompany">{formErrors.location}</p>
              </div>

              <div className="form_box_dashboardCompany">
                   <label>Type of Company*</label>
                   <select onChange={handleType} className="select_dashboardCompany">
                    <option value="" disabled selected hidden>{companyInfoDetails.typeofcompany}</option> 
                    {typeData.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                   <p className="errors_msg_dashboardCompany">{formErrors.type}</p>
              </div>


              <div className="form_box_dashboardCompany">
                <label>Established In* (Year)</label>
                <input readOnly type="number" name="year" placeholder="Year of Establishment" value={companyInfoDetails.established} />
              </div>

              <div className='form_box_dashboardCompany'>
                <label>About Company*</label>
                <textarea rows="7" name="about" onChange={handleForm} defaultValue={companyInfoDetails.description} placeholder="Explain what your company does..."></textarea>
                <p className="errors_msg_dashboardCompany">{formErrors.about}</p>
              </div>

                 <div className='modal_bottom_section_dashboardCompany'>
                   <button onClick={closeForm} className='btn_light_dashboardCompany'>Cancel</button>
                   <button type='submit' onClick={submitForm} className='btn_primary_dashboardCompany'>Save Details</button>
                 </div>
               </form>
          </div>
         </div>
      </div>
       
      )}


      {isModal2 && (

        <div className='modal_backgound_dashboardCompany'>
          <div className='modal_container_dashboardCompany'>
            <div className='modal_top_section_dashboardCompany'>
            <h2>Edit Account Details</h2>
            <p className="errors_msg_dashboardCompany">{formErrors.others}</p>
          </div>

          <div className='modal_mid_section_dashboardCompany'>
            <form>
              <div className="form_box_dashboardCompany">
                <label>Name</label>
                <input type="text" name="name" defaultValue={companydetails.name} placeholder="Enter Your Name" onChange={handleForm2} />
                <p className="errors_msg_dashboardCompany">{formErrors2.name}</p>
              </div>

              <div className="form_box_dashboardCompany">
                <label>Company Name</label>
                <input type="text" name="companyname" defaultValue={companydetails.companyname} placeholder="Enter Company Name" onChange={handleForm2} />
                <p className="errors_msg_dashboardCompany">{formErrors2.companyname}</p>
              </div>

      <div className="form_box_dashboardCompany">
        <label>Designation</label>
        <input type="text" name="designation" defaultValue={companydetails.designation} placeholder="Enter Your Designation" onChange={handleForm2} />
        <p className="errors_msg_dashboardCompany">{formErrors2.designation}</p>
      </div>

         <div className="form_box_dashboardCompany">
           <label>Mobile Number</label>
           <input type="number" defaultValue={companydetails.phoneno}  name="mobile" placeholder="Enter Phone Number" onChange={handleForm2}/>
           <p className="errors_msg_dashboardCompany">{formErrors2.mobile}</p>
         </div>

         <div className='form_box_dashboardCompany'>
          <label>Email Address</label>
          <input readOnly value={companydetails.email} type="email"></input>
         </div>

         <div className='modal_bottom_section_dashboardCompany'>
           <button onClick={closeForm2} className='btn_light_dashboardCompany'>Cancel</button>
           <button type='submit' onClick={submitForm2} className='btn_primary_dashboardCompany'>Save Details</button>
         </div>
       </form>
  </div>
 </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCompany;
