import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/student/Home";
import Login from "./pages/student/Login";
import SignUp from "./pages/student/SignUp";
import Student from "./pages/student/Student";
import EmailVerify from "./pages/student/EmailVerify";
import OTPVerify from "./pages/student/OTPVerify";
import ForgotPassword from "./pages/student/ForgotPassword";
import DetailsOne from "./pages/student/DetailsOne";
import Resume from "./pages/student/Resume";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Company Routes
import HomeCompany from "./pages/company/HomeCompany";
import SignUpCompany from "./pages/company/SignUpCompany";
import DetailsOneCompany from "./pages/company/DetailsOneCompany";
import InfoCompany from "./pages/company/InfoCompany";
import InternshipDetail from "./pages/company/InternshipDetail";
import Error404 from "./pages/student/Error404";
import InfoAdmin from "./pages/admin/InfoAdmin";
import CompanyResume from "./pages/company/CompanyResume";
import SignUpAdmin from "./pages/admin/SignUpAdmin";

const App = () => {
  const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.className = theme;
  },[theme]);

  return (  //home navigate('/home') 
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/student/:id/*" element={<Student theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/signup" element={<SignUp theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/login" element={<Login theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/emailverify/:type" element={<EmailVerify theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/otpverify/:email/:type" element={<OTPVerify theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/student/:id/detailsone" element={<DetailsOne theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/forgotpassword/:email" element={<ForgotPassword theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/resume/:id" element={<Resume theme={theme} setTheme={setTheme}/>} />
        <Route exact path="*" element={<Error404 />} />


  // navbar home skills

        {/* Company Routes */}
        <Route exact path="/company" element={<HomeCompany theme={theme} setTheme={setTheme} />} />
        <Route exact path="/company/signup" element={<SignUpCompany theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/company/info/:id/*" element={<InfoCompany theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/company/:id/detailsone" element={<DetailsOneCompany theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/company/internship/:i_id" element={<InternshipDetail theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/company/resume/:id" element={<CompanyResume theme={theme} setTheme={setTheme}/>} />


        {/* Admin Routes */}
        <Route exact path="/admin/info/:id/*" element={<InfoAdmin theme={theme} setTheme={setTheme}/>} />
        <Route exact path="/admin/:id/signup" element={<SignUpAdmin theme={theme} setTheme={setTheme}/>} />              
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
