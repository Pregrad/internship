const express = require("express")

const router = express.Router();

const {ADMINREGISTER} = require("../utils/constants/app_constants").ROUTES.ADMIN;

const {ADMIN} = require("../utils/constants/app_constants").ROUTES.AUTH;

const {registerAdmin,AdminInfo,verifiedCompany,reportedInternship,reports,VerifiedRepotedInternship,createTestimoials,getTestimonials,deleteTestimonial,addCources,showCources,deleteCources,addEvents,showEvents,deleteEvents,homeCources,allAdmins,deleteAdmin} = require("../controllers/AdminController");

const {CheckAdmin} = require("../Middleware/AuthMiddlewareAdmin");

const Handler = require("../ErrorHandling/Authentication/AdminAuthError");

router.route(ADMINREGISTER).post(Handler.register,registerAdmin);

router.route(ADMIN).post(CheckAdmin);

router.route("/getadmininfo/:id").get(AdminInfo);

router.route("/verifiedCompany/:id").put(verifiedCompany);

router.route("/reportedinternships").get(reportedInternship);

router.route("/getreports/:i_id").get(reports);

router.route("/verifiedreportedinternship/:id").put(VerifiedRepotedInternship);

router.route("/testimonials/:id").post(createTestimoials);

router.route("/gettestimonials/:id").get(getTestimonials);

router.route("/deletetestimonial/:id/:t_id").put(deleteTestimonial);

router.route("/cources/:id").post(addCources);

router.route("/getcources/:id").get(showCources);

router.route("/deletecources/:id/:c_id").put(deleteCources);

router.route("/events/:id").post(addEvents);

router.route("/getevents/:id").get(showEvents);

router.route("/deleteevent/:id/:e_id").put(deleteEvents);

router.route("/showcources").get(homeCources);

// router.route("/showevents").get(homeEvents);

// router.route("/showtestimonials").get(homeTestimonials);

router.route("/alladmins").get(allAdmins);

router.route("/deleteadmin/:a_id").delete(deleteAdmin);

 
module.exports = router;