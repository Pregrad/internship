const express = require('express')

const router = express.Router()

const { registerCompany,getCompanyInfo,companyDetails,getCompanyDetails,editProfile,editAccount,getInternships,unAuthorizedCompany} = require('../controllers/companyController')

const {createInternship,Internship,singleInternship,editInternship,closeInternship,allInternship,getApplicants,rejectedApplicants} = require('../controllers/internshipController')

const {
    REGISTER,
    GETCOMPANYINFO,
    POSTCOMPANYDETAILS,
    GETCOMPANYDETAILS,
    ADDINTERNSHIPS,
    EDITPROFILE,
    EDITACCOUNT,
    GETINTERNSHIPS,
    INTERNSHIP,
    SINGLEINTERNSHIP,
    EDITINTERNSHIP,
    CLOSEINTERNSHIP,
    ALLINTERNSHIP,
    APPLICATIONS,
    REJECTEDAPPLICANTS
} = require("../utils/constants/app_constants").ROUTES.COMPANY;

const Handler = require("../ErrorHandling/Authentication/AuthError").COMPANY;

const InfoHandler = require("../ErrorHandling/CompanyInfo/InfoError");
// register 

router.route(REGISTER).post(Handler.register,registerCompany);

router.route(GETCOMPANYINFO).get(getCompanyInfo);

router.route(POSTCOMPANYDETAILS).post(InfoHandler.detailsOne,companyDetails);

router.route(GETCOMPANYDETAILS).get(getCompanyDetails);

router.route(ADDINTERNSHIPS).post(InfoHandler.addInternship,createInternship);

router.route(EDITPROFILE).put(InfoHandler.profile,editProfile);

router.route(EDITACCOUNT).put(InfoHandler.account,editAccount);

router.route(GETINTERNSHIPS).get(getInternships);

router.route(INTERNSHIP).get(Internship);

router.route(SINGLEINTERNSHIP).get(singleInternship);

router.route(EDITINTERNSHIP).put(InfoHandler.addInternship,editInternship);

router.route(CLOSEINTERNSHIP).put(closeInternship);

router.route(ALLINTERNSHIP).get(allInternship);

router.route(APPLICATIONS).get(getApplicants);

router.route(REJECTEDAPPLICANTS).put(rejectedApplicants);

router.route("/unauthorized").get(unAuthorizedCompany);

module.exports = router