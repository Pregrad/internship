import React, { useEffect, useState } from "react";
import "../../../components/admin/css/UserAdmin/EventsAdminStyles.css";
import Student1 from "../../../img/home-banner/student1.png";
import { FaTrashAlt } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link,useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";

const EventsAdmin = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [cookies,setCookie,removeCookie] = useCookies([]);

  const [Events,setEvents] = useState()

  const {id} = useParams();

  const navigate = useNavigate();
 
  const [info, setInfo] = useState({
    name: "",
    imagelink: "",
    speaker: "",
    organisation: "",
    date: "",
    time: "",
    eventlink: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(info));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name required";
    } else if (values.name.length < 2) {
      errors.name = "Minimum 2 characters required";
    } else if (values.name.length > 28) {
      errors.name = "Maximum 28 characters required";
    }

    if (!values.imagelink) {
      errors.imagelink = "Image link required";
    }

    if (!values.speaker) {
      errors.speaker = "Speaker name required";
    } else if (values.speaker.length < 2) {
      errors.speaker = "Minimum 2 characters required";
    } else if (values.speaker.length > 18) {
      errors.speaker = "Maximum 18 characters required";
    }

    if (!values.organisation) {
      errors.organisation = "Organisation name required";
    } else if (values.organisation.length < 2) {
      errors.organisation = "Minimum 2 characters required";
    } else if (values.organisation.length > 28) {
      errors.organisation = "Maximum 28 characters required";
    }

    if (!values.date) {
      errors.date = "Date of event required";
    }

    if (!values.time) {
      errors.time = "Time of event required";
    }

    if (!values.eventlink) {
      errors.eventlink = "Event link required";
    }

    return errors;
  };

  const getEvents = ()=>{
    axios.get(`http://localhost:8000/admin/getevents/${id}`).then(({data})=>{
      if(data.message){ 
        if(data.events.length < 7 ){
        setEvents(data.events);
      }else{
        setFormErrors({other:"Maximum limit reached, first delete previous events to add a new one."})
      }
      }
    })
  }

  const deleteEvent = (id,e_id)=>{

    axios.put(`http://localhost:8000/admin/deleteevent/${id}/${e_id}`).then(({data})=>{
      if(data.message){
        getEvents();
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

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if(Events.length < 7){
      axios.post(`http://localhost:8000/admin/events/${id}`,{
        ...info
      }).then(({data})=>{
        if(data.message){
          setIsSubmit(false);
          setInfo({...info, 
            name: "",
            imagelink: "",
            speaker: "",
            organisation: "",
            date: "",
            time: "",
            eventlink: ""
          })
          getEvents();
        }else{
          setFormErrors(data.errors);
        }
      })
    } 
    else{
        setFormErrors({other:"Maximum limit reached, first delete previous events to add a new one."});
      }
    }
   
    getEvents();
  }, [formErrors]);

  return (
    <div>
      <div className="main_box_eventsadmin">
        <div className="main_container_eventsadmin">
          <div className="top_section_eventsadmin">
            <h2>New Event</h2>
          </div>

{
  (formErrors.other)?
          <div className="main_msg_eventsadmin">
            <p>{formErrors.other}</p>
          </div>:""
}
          <div className="mid_section_eventsadmin">
            <form>
              <div className="form_container_eventsadmin">
                <div className="form_box_eventsadmin">
                  <label>Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={info.name}
                    onChange={handleForm}
                    placeholder="Enter Event Name"
                  />
                  <p className="errors_msg_eventsadmin">{formErrors.name}</p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Image Link*</label>
                  <input
                    type="url"
                    name="imagelink"
                    value={info.imagelink}
                    onChange={handleForm}
                    placeholder="Enter Image Link"
                  />
                  <p className="errors_msg_eventsadmin">
                    {formErrors.imagelink}
                  </p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Speaker Name*</label>
                  <input
                    type="text"
                    name="speaker"
                    value={info.speaker}
                    onChange={handleForm}
                    placeholder="Enter Speaker Name"
                  />
                  <p className="errors_msg_eventsadmin">{formErrors.speaker}</p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Organisation Name*</label>
                  <input
                    type="text"
                    name="organisation"
                    value={info.organisation}
                    onChange={handleForm}
                    placeholder="Enter Organisation Name"
                  />
                  <p className="errors_msg_eventsadmin">
                    {formErrors.organisation}
                  </p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Event Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={info.date}
                    onChange={handleForm}
                    placeholder="Enter Event Date"
                  />
                  <p className="errors_msg_eventsadmin">{formErrors.date}</p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Event Time*</label>
                  <input
                    type="time"
                    name="time"
                    value={info.time}
                    onChange={handleForm}
                    placeholder="Enter Event Time"
                  />
                  <p className="errors_msg_eventsadmin">{formErrors.time}</p>
                </div>

                <div className="form_box_eventsadmin">
                  <label>Event Link*</label>
                  <input
                    type="url"
                    name="eventlink"
                    value={info.eventlink}
                    onChange={handleForm}
                    placeholder="Enter Event Link"
                  />
                  <p className="errors_msg_eventsadmin">
                    {formErrors.eventlink}
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="bottom_section_eventsadmin">
            <button onClick={submitForm} className="btn_primary_eventsadmin">
              Post Event
            </button>
          </div>
        </div>

        <div className="main_container_eventsadmin">
          <div className="top_section_eventsadmin">
            <h2>Previous Events</h2>
          </div>


    <div className="testimonial_container_eventsadmin" >
          {
               (Events !== undefined)?Events.map((event)=>(
              <div className="testimonial_box_eventsadmin" key={event._id}>
                <div className="testimonial_box_upper_section_eventsadmin">
                  <img src={event.imagelink} alt="eventimage" />
                  <div className="testimonial_details_eventsadmin">
                    <h2>{event.name}</h2>
                    <h3>{event.speaker}, {event.organisation}</h3>
                    <p>{event.date} | {event.time}</p>
                  </div>
                </div>
                <div className="testimonial_box_bottom_section_eventsadmin">
                  <a href={event.eventlink}>Event Link</a>
                  <button className="btn_delete_eventsadmin" onClick={()=>deleteEvent(id,event._id)}>
                    <FaTrashAlt className="delete_icon_eventsadmin" />
                    Delete
                  </button>
                </div>
              </div>
          )):""

        }
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default EventsAdmin;
