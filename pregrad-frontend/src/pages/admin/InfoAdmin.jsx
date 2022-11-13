import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "./UserAdmin/DashboardAdmin";
import SidebarAdmin from "../../components/admin/jsx/SidebarAdmin";
import Reports from "./UserAdmin/Reports";
import Verification from "./UserAdmin/Verification";
import ReportCandidates  from "./UserAdmin/ReportCandidates";
import EventsAdmin from "../admin/UserAdmin/EventsAdmin";
import TestimonialsAdmin from "../admin/UserAdmin/TestimonialsAdmin";
import CoursesAdmin from "../admin/UserAdmin/CoursesAdmin";

const InfoAdmin = ({theme, setTheme}) => {

  return (
    <SidebarAdmin  theme={theme} setTheme={setTheme}>
        <Routes>
            <Route exact path="/dashboard" element={<DashboardAdmin />}  />
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/verification" element={<Verification />} />
            <Route exact path="/reports/candidates/:i_id" element={<ReportCandidates  />} />
            <Route exact path="/events" element={<EventsAdmin />} />
            <Route exact path="/testimonials" element={<TestimonialsAdmin />} />
            <Route exact path="/courses" element={<CoursesAdmin />} />
        </Routes>
    </SidebarAdmin>
  )
}

export default InfoAdmin
