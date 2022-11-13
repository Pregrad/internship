import React, { useEffect, useState } from "react";
import "../../../components/admin/css/UserAdmin/TestimonialsAdminStyles.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const TestimonialsAdmin = () => {

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [cookies,setCookie,removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const [testimonials,setTestimonials] = useState([]);

  const [info, setInfo] = useState({
    name: "",
    image_link: "",
    college_name: "",
    description: "",
  });

  const handleForm = (e) => {
    const {name, value} = e.target;
    setInfo({
      ...info,
      [name]: value
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(info));
    setIsSubmit(true);
  }

  const validate = (values) => {
    
    const errors = {};

    if(!values.name){
      errors.name = "Name required";
    }else if(values.name.length < 2){
      errors.name = "Minimum 2 characters required";
    }else if(values.name.length > 28){
      errors.name = "Maximum 28 characters required";
    }

    if(!values.image_link){
        errors.imagelink = "Image Link required"
    }

    if(!values.college_name){
      errors.college = "Company name required";
    }else if(values.college_name.length < 2){
      errors.college = "Minimum 2 characters required";
    }else if(values.college_name.length > 18){
      errors.college = "Maximum 18 characters required";
    }

    if(!values.description){
      errors.description = "Description required"
    }

    return errors;
  }

  const deleteTestimonial = (id,t_id)=>{

    axios.put(`http://localhost:8000/admin/deletetestimonial/${id}/${t_id}`).then(({data})=>{
      if(data.message){
        getTestimonials();
      }
    })

  }

  const getTestimonials = ()=>{
    axios.get(`http://localhost:8000/admin/gettestimonials/${id}`).then(({data})=>{
      if(data.message){
    
        if(data.testimonials.length < 7){
        setTestimonials(data.testimonials);
        setFormErrors({});
        setIsSubmit(false);
      }else{
        setTestimonials(data.testimonials);
        setFormErrors({other:"Maximum limit reached, first delete previous testimonials to add a new one."})
      } 
      }
    })
  }

  useEffect(() => {

    const verifyUser = async()=>{
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await axios.post(`http://localhost:8000/admin/checkadmin`,{},{withCredentials:true}) 
        if(data.id !== id || data.status !== true || data.role != "superadmin"){ 
          removeCookie("jwt")
          navigate('/login')
        }
      }
    }
    verifyUser();

    if( Object.keys(formErrors).length === 0 && isSubmit ){
      if(testimonials.length < 7){
        axios.post(`http://localhost:8000/admin/testimonials/${id}`,{
          ...info
        }).then(({data})=>{
          if(data.message){
            setIsSubmit(false); 
            setInfo({...info,name:"",college_name:"",description:"",image_link:""}); 
            getTestimonials();
          }
          else{
            setFormErrors(data.errors);
          }
        })
      }
      else{
        setFormErrors({other:"Maximum limit reached, first delete previous testimonials to add a new one."});
      }
    } 

    getTestimonials();
  }, [formErrors]);

  return (
    <div>
      <div className="main_box_testimonialsadmin">
        <div className="main_container_testimonialsadmin">
          <div className="top_section_testimonialsadmin">
            <h2>New Testimonial</h2>
          </div>

          {
  (formErrors.other)?
          <div className="main_msg_eventsadmin">
            <p>{formErrors.other}</p>
          </div>:""
}
          <div className="mid_section_testimonialsadmin">
            <form>
              <div className="form_container_testimonialsadmin">
                <div className="form_box_testimonialsadmin">
                  <label>Name*</label>
                  <input type="text" name="name" value={info.name} onChange={handleForm} placeholder="Enter Testimonial Name" />
                  <p className="errors_msg_testimonialsadmin">{formErrors.name}</p>
                </div>

                <div className="form_box_testimonialsadmin">
                  <label>Image Link*</label>
                  <input type="url" name="image_link" value={info.image_link} onChange={handleForm} placeholder="Enter Image Link" />
                  <p className="errors_msg_testimonialsadmin">{formErrors.image_link}</p>
                </div>
                
                <div className="form_box_testimonialsadmin">
                  <label>College Name*</label>
                  <input type="text" name="college_name" value={info.college_name} onChange={handleForm} placeholder="Enter College Name" />
                  <p className="errors_msg_testimonialsadmin">{formErrors.college_name}</p>
                </div>

                <div className="form_box_testimonialsadmin">
                  <label>Description*</label>
                  <textarea rows={5} name="description" value={info.description} onChange={handleForm} placeholder="Enter Description ..."></textarea>
                  <p className="errors_msg_testimonialsadmin">{formErrors.description}</p>
                </div>
              </div>
            </form>
          </div>
          <div className="bottom_section_testimonialsadmin">
            <button
              onClick={submitForm}
              className="btn_primary_testimonialsadmin"
            >
              Post Testimonial
            </button>
          </div>
        </div>

        <div className="main_container_testimonialsadmin">
          <div className="top_section_testimonialsadmin">
            <h2>Previous Testimonials</h2>
          </div>
  
          <div className="testimonial_container_testimonialsadmin">
            {
 
  (testimonials !== undefined )?
  
    testimonials.map((testimonial)=>(
                <div className="testimonial_box_testimonialsadmin" key={testimonial._id}>
                <div className="testimonial_box_upper_section_testimonialsadmin">
                  <img src={testimonial.image_link} alt="testimonial" />
                  <div className="testimonial_details_testimonialsadmin">
                    <h2>{testimonial.name}</h2>
                    <h3>{testimonial.college_name}</h3>
                    <p>{testimonial.description}</p>
                  </div>
                </div>
                <div className="testimonial_box_bottom_section_testimonialsadmin">
                  <button className="btn_delete_testimonialsadmin" onClick={()=>deleteTestimonial(id,testimonial._id)}>
                    <FaTrashAlt className="delete_icon_testimonialsadmin" />
                    Delete
                  </button>
                </div>
                </div>
              ))
  :""

             
            
            }

            {/* <div className="testimonial_box_testimonialsadmin">
              <div className="testimonial_box_upper_section_testimonialsadmin">
                <img src={Student1} alt="testimonial" />
                <div className="testimonial_details_testimonialsadmin">
                  <h2>Gautam hopra</h2>
                  <h3>BVCOE DELHI</h3>
                  <p>Though the journey from applying for an internship to getting selected is quite exhausting but the Pregrad Team made the whole process smooth by always being available for any issues and proper guidance.</p>
                </div>
              </div>
              <div className="testimonial_box_bottom_section_testimonialsadmin">
                <button className="btn_delete_testimonialsadmin">
                  <FaTrashAlt classNmae="delete_icon_testimonialsadmin" />
                  Delete
                </button>
              </div>
            </div> */}

            {/* <div className="testimonial_box_testimonialsadmin">
              <div className="testimonial_box_upper_section_testimonialsadmin">
                <img src={Student1} alt="testimonial" />
                <div className="testimonial_details_testimonialsadmin">
                  <h2>Gautam hopra</h2>
                  <h3>BVCOE DELHI</h3>
                  <p>Though the journey from applying for an internship to getting selected is quite exhausting but the Pregrad Team made the whole process smooth by always being available for any issues and proper guidance.</p>
                </div>
              </div>
              <div className="testimonial_box_bottom_section_testimonialsadmin">
                <button className="btn_delete_testimonialsadmin">
                  <FaTrashAlt classNmae="delete_icon_testimonialsadmin" />
                  Delete
                </button>
              </div>
            </div> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAdmin;
