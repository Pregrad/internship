const express = require("express");
const router = express.Router()

const {reportInternship} = require("../controllers/internshipController")

const {REPORT} = require("../utils/constants/app_constants").ROUTES.INTERNSHIP;

const Handler = require("../ErrorHandling/CompanyInfo/InfoError");

router.route(REPORT).post(Handler.report,reportInternship);

module.exports = router;