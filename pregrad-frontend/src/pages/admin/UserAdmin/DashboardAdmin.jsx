import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlinePeopleAlt } from 'react-icons/md';
import { BiTrash } from "react-icons/bi";
import { useNavigate, Link,useParams } from 'react-router-dom';
import "../../../components/admin/css/UserAdmin/DashboardAdminStyles.css";
import axios from 'axios'
import {useCookies} from 'react-cookie';
import PageLoader from "../../../img/page-loader.gif";
import ReactTooltip from 'react-tooltip';


const DashboardAdmin = () => {
  
  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  const [isPageLoading, setIsPageLoading] = useState(false);


  const [admins,setAdmins] = useState([]);

  const {id} = useParams();
  
  const [companydetails,setCompanyDetails] = useState({})
 
  const [companyInfoDetails,setCompanyInfoDetails] = useState({})

  // EDIT FORM 1
  const [isModal, setIsModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [adminInfo,setAdminInfo] = useState({})

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
    }else if(values.mobile.length !== 10){
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

const getAdminInfo = ()=>{
  axios.get(`http://localhost:8000/admin/getadmininfo/${id}`).then(({data})=>{
  setAdminInfo(data)
  console.log(data);
})
}

const getAllAdmins = ()=>{

  axios.get(`http://localhost:8000/admin/alladmins`).then(({data})=>{
    if(data){
      setAdmins(data.admin);
    }
  })

}

const deleteAdmin = (a_id)=>{

  axios.delete(`http://localhost:8000/admin/deleteadmin/${a_id}`).then(({data})=>{
    if(data.message){
      getAllAdmins();
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
        // setIsPageLoading(true);
        getAdminInfo();
        getAllAdmins();
        navigate(`/admin/info/${id}/dashboard`);
      }
    }
  }
  verifyUser()
 
},[])
 
  // useEffect(() => {

    
    // const verifyCompany = ()=>{

      // if(!cookies.jwt){
      //   navigate('/login')
      // }else{
      //   axios.post(`http://localhost:8000/company`,{},{
      //     withCredentials:true,
      //   }).then(({data})=>{

      //     if(data.id != id){
      //       removeCookie("jwt")
      //       navigate('/login')
      //     }else{
      //       setIsPageLoading(true)
      //        getCompanyInfo()
      //        getCompanyDetails()
      //     
      //     } 
      //   })
      // }
    // }
  
    // verifyCompany()  
  
    // if( Object.keys(formErrors).length === 0 && isSubmit ){
    //     axios.put(`http://localhost:8000/company/editprofile/${id}`,{
    //       ...editDetailsProfile
    //     })
    //     setIsModal(!isModal)
    // }

    // if(Object.keys(formErrors2).length == 0 && isSubmit2){
    //   axios.put(`http://localhost:8000/company/editaccount/${id}`,{
    //     ...accountInfo
    //   })
    //   setIsModal2(!isModal2)
    // } 
  

  const initials = adminInfo.name
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
    setIsModal2(!isModal2)
    setAccountInfo({...accountInfo,
    name:companydetails.name,
    companyname:companydetails.companyname,
    designation:companydetails.designation, 
    mobile: companydetails.phoneno
  })
  }

  return (
    <div>
      {isPageLoading ? (
        <div className='page_loading_container_dashboardAdmin'>
          <img src={PageLoader} alt="Loading" />
        </div>
      ) : (
        <div className='main_container_dashboardAdmin'>
        <div className='left_section_container_dashboardAdmin'>
          <div className='top_details_section_dashboardAdmin'>
            <div className='left_details_section_dashboardAdmin'>
              <div className='logo_container_dashboardAdmin'>
                {name_initials}
              </div>
              <div className='info_container_dashboardAdmin'>
                <h2>{adminInfo.name}</h2>
                <p>{adminInfo.role}</p>
              </div>
              {/* <HiOutlinePencil onClick={setEditProfile} className="edit_icon2_dashboardAdmin" /> */}
            </div>
            {/* <div className='right_details_section_dashboardAdmin'>
              <HiOutlinePencil onClick={setEditProfile} className="edit_icon_dashboardAdmin" data-tip data-for="editProfile" />
              <ReactTooltip id="editProfile" place="bottom" data-background-color="#1e272e" effect="solid" delayShow={800}>
                <span>Edit your profile</span>
              </ReactTooltip>
            </div> */}
          </div>

          <div className='mid_details_section_dashboardAdmin'>
            <div className='account_container_dashboardAdmin'>
              <div className='top_box_account_dashboardAdmin'>
                <div>
                  <FiSettings className='settings_icon_dashboardAdmin' />
                  <h2>Company Verification</h2>
                </div>
                <p onClick={()=>navigate(`/admin/info/${id}/verification`)}>View</p>
              </div>
              <div className='bottom_box_account_dashboardAdmin'>
                <p>Block or Allow access to companies to post their Internships.</p>
              </div>
            </div>

            <div className='applicants_container_dashboardAdmin'>
              <div className='top_box_applicants_dashboardAdmin'>
                <div>
                  <MdOutlinePeopleAlt className='people_icon_dashboardAdmin' />
                  <h2>New Reports&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                </div>
                <Link to={`/admin/info/${id}/reports`}>View</Link>
              </div>
              <div className='bottom_box_applicants_dashboardAdmin'>
                <p>Check new reports applied for different internships.</p>
              </div>
            </div>
          </div>

        { 
        (adminInfo.role === "superadmin")?
         <div className='bottom_details_section_dashboardAdmin'>
            <div className='admin_container_dashboardAdmin'>
            <div className='bottom_details_upper_section_dashboardAdmin'>
              <MdOutlineAdminPanelSettings className="admin_icon_dashboardAdmin" />
              <h2>Admins</h2>
            </div>

            <div className='bottom_details_lower_section_dashboardAdmin'>
             { 
             (admins != undefined)?
      admins.map((admin)=>(
        <div className='admin_box_dashboardAdmin' key={admin._id}>
        <div className='admin_box_upper_section_dashboardAdmin'>
          <h3>{admin.name}</h3>
          <div className='delete_admin_box_dashboardAdmin' onClick={()=>deleteAdmin(admin._id)}>
            <BiTrash className="delete_admin_icon_dashboardAdmin" />
          </div>
        </div>
        <h5>{admin.email}</h5>
      </div>
      )):""
            
              }
          
            </div>
            </div>
          </div>:""
          }
        </div>

        <div className='right_section_container_dashboardAdmin'>
          <div className='top_tc_section_dashboardAdmin'>
            <h2>Important T&C Update</h2>
            <p>If you hire any candidate from Pregrad, it is mandatory to Send Offer from the platform. If you do not do so, we may take some action and you won't be allowed to use our services further.</p>
          </div>
        </div>
      </div>
      )}
      


      {/* {isModal && (
        
        <div className='modal_backgound_dashboardAdmin'>
        <div className='modal_container_dashboardAdmin'>
          <div className='modal_top_section_dashboardAdmin'>
            <h2>Edit Profile</h2>
            <p className="errors_msg_dashboardAdmin">{formErrors.others}</p>
          </div>
 
          <div className='modal_mid_section_dashboardAdmin'>
            <form>
              <div className="form_box_dashboardAdmin">
                <label>Linkedin*</label>
                <input type="url" name="linkedinlink" placeholder="Linkedin Id" defaultValue={companyInfoDetails.linkedin} onChange={handleForm} />
                <p className="errors_msg_dashboardAdmin">{formErrors.linkedinlink}</p>
              </div>

              <div className="form_box_dashboardAdmin">
                <label>Website Link</label>
                <input type="url" name="websitelink" defaultValue={companyInfoDetails.websitelink} placeholder="Your Website Link" onChange={handleForm} />
                <p className="errors_msg_dashboardAdmin">{formErrors.websitelink}</p>
              </div>

              <div className="form_box_dashboardAdmin">
                   <label>Location of Headquarters</label>
                   <select onChange={handleLocation} className="select_dashboardAdmin">
                    <option value="" disabled selected hidden>{companyInfoDetails.headquaters}</option> 
                    {locationData.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                   <p className="errors_msg_dashboardAdmin">{formErrors.location}</p>
              </div>

              <div className="form_box_dashboardAdmin">
                   <label>Type of Company*</label>
                   <select onChange={handleType} className="select_dashboardAdmin">
                    <option value="" disabled selected hidden>{companyInfoDetails.typeofcompany}</option> 
                    {typeData.map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                    </select>
                   <p className="errors_msg_dashboardAdmin">{formErrors.type}</p>
              </div>


              <div className="form_box_dashboardAdmin">
                <label>Established In* (Year)</label>
                <input readOnly type="number" name="year" placeholder="Year of Establishment" value={companyInfoDetails.established} />
              </div>

              <div className='form_box_dashboardAdmin'>
                <label>About Company*</label>
                <textarea rows="7" name="about" onChange={handleForm} defaultValue={companyInfoDetails.description} placeholder="Explain what your company does..."></textarea>
                <p className="errors_msg_dashboardAdmin">{formErrors.about}</p>
              </div>

                 <div className='modal_bottom_section_dashboardAdmin'>
                   <button onClick={() => setIsModal(!isModal)} className='btn_light_dashboardAdmin'>Cancel</button>
                   <button type='submit' onClick={submitForm} className='btn_primary_dashboardAdmin'>Save Details</button>
                 </div>
               </form>
          </div>
         </div>
      </div>
       
      )} */}


      {/* {isModal2 && (

        <div className='modal_backgound_dashboardAdmin'>
          <div className='modal_container_dashboardAdmin'>
            <div className='modal_top_section_dashboardAdmin'>
            <h2>Edit Account Details</h2>
            <p className="errors_msg_dashboardAdmin">{formErrors.others}</p>
          </div>

          <div className='modal_mid_section_dashboardAdmin'>
            <form>
              <div className="form_box_dashboardAdmin">
                <label>Name</label>
                <input type="text" name="name" defaultValue={companydetails.name} placeholder="Enter Your Name" onChange={handleForm2} />
                <p className="errors_msg_dashboardAdmin">{formErrors2.name}</p>
              </div>

              <div className="form_box_dashboardAdmin">
                <label>Company Name</label>
                <input type="text" name="companyname" defaultValue={companydetails.companyname} placeholder="Enter Company Name" onChange={handleForm2} />
                <p className="errors_msg_dashboardAdmin">{formErrors2.companyname}</p>
              </div>

      <div className="form_box_dashboardAdmin">
        <label>Designation</label>
        <input type="text" name="designation" defaultValue={companydetails.designation} placeholder="Enter Your Designation" onChange={handleForm2} />
        <p className="errors_msg_dashboardAdmin">{formErrors2.designation}</p>
      </div>

         <div className="form_box_dashboardAdmin">
           <label>Mobile Number</label>
           <input type="number" defaultValue={companydetails.phoneno}  name="mobile" placeholder="Enter Phone Number" onChange={handleForm2}/>
           <p className="errors_msg_dashboardAdmin">{formErrors2.mobile}</p>
         </div>

         <div className='form_box_dashboardAdmin'>
          <label>Email Address</label>
          <input readOnly value={companydetails.email} type="email"></input>
         </div>

         <div className='modal_bottom_section_dashboardAdmin'>
           <button onClick={() => setIsModal2(!isModal2)} className='btn_light_dashboardAdmin'>Cancel</button>
           <button type='submit' onClick={submitForm2} className='btn_primary_dashboardAdmin'>Save Details</button>
         </div>
       </form>
  </div>
 </div>
        </div>
      )} */}
    </div>
  )
}

export default DashboardAdmin;
