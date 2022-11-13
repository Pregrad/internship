import React,{useState} from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/student/jsx/Sidebar";
import WorkExperience from "./UserStudent/WorkExperience";
import Education from "./UserStudent/Education";
import Internships from "./UserStudent/Internships";
import Projects from "./UserStudent/Projects";
import Achievements from "./UserStudent/Achievements";
import { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import StudentProfile from "./UserStudent/StudentProfile";
import Error404 from "./Error404";


const Student = ({theme, setTheme}) => {

  const navigate = useNavigate()

const {id} = useParams()

const  [user,setUser] = useState({})

const [profilehealth,setprofileHealth] = useState(20)

  const [cookies,setCookie,removeCookie] = useCookies([])

  const userHealthProfile = ()=>{
   
        axios.get(`http://localhost:8000/student/profilehealth/${id}`).then(({data})=>{
          setprofileHealth(data.profileHealth)
  }) 
}

const getUserDetails = async()=>{
  const {data} = await axios.get(`http://localhost:8000/userDetails/${id}`)
  setUser(data)
}

useEffect(()=>{
  const verifyUser = async()=>{
    if(!cookies.jwt){
      navigate('/login')
    }else{
      const {data} = await axios.post(`http://localhost:8000/student`,{},{withCredentials:true}) 
      if(data.id !== id || data.status !== true){
        removeCookie("jwt")
        navigate('/login')
      }else{
        getUserDetails()
        userHealthProfile()
      }
    }
  }
  verifyUser()
},[profilehealth])


  return ( 
    <Sidebar profilehealth={profilehealth} userHealthProfile={userHealthProfile} userinfo={user === undefined ?"":user} theme={theme} setTheme={setTheme}>
      <Routes>
        <Route exact path="/internships" element={<Internships profilehealth={profilehealth}/>} />
        <Route exact path="/workexperience" element={<WorkExperience profilehealth={profilehealth} userHealthProfile={userHealthProfile}/>} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/achievements" element={<Achievements />} />
        <Route exact path="/education" element={<Education />} />
        <Route exact path="/profile" element={<StudentProfile userinfo={user === undefined ?"":user} getUserDetails={getUserDetails}/>} />
        {/* <Route exact path="*" element={<Error404 />} /> */}
      </Routes>
    </Sidebar>
  );
};

export default Student;
