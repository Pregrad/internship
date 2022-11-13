const express = require("express");
const router = express.Router();

const {
    studentAchievement,
    getAchievementInfo,
    deleteAchievement,
    updateAchievement,
    updatedAchievement,
    studentProject,
    getProjectsInfo,
    deleteProject,
    updateProject,
    updatedProject,
    studentEducation,
    getEducationInfo,
    deleteEducation,
    updateEducation,
    updatedEducation,
    studentWorkExperience,
    getWorkExperienceInfo,
    deleteWorkExperience,
    updatedWorkExperience,
    updateWorkExperience,
    allStudentData,
    detailsOne,
    profileHealth,
    editProfileDetails,
    appliedInternship,
    getappliedInternship

} = require('../controllers/studentController')

const {PROFILE_DETAIL,PROFILEHEALTH,EDIT_PROFILE} = require("../utils/constants/app_constants").ROUTES.STUDENT.PROFILE;

const {POST_ACHIEVEMENT,GET_ACHIEVEMENT,DELETE_ACHIEVEMENT,UPDATE_ACHIEVEMENT,UPDATED_ACHIEVEMENT} = require("../utils/constants/app_constants").ROUTES.STUDENT.ACHIEVEMENTS;

const {POST_PROJECT,GET_PROJECT,DELETE_PROJECT,UPDATE_PROJECT,UPDATED_PROJECT} = require("../utils/constants/app_constants").ROUTES.STUDENT.PROJECTS;

const {POST_EDUCATION,GET_EDUCATION,DELETE_EDUCATION,UPDATE_EDUCATION,UPDATED_EDUCATION} = require("../utils/constants/app_constants").ROUTES.STUDENT.EDUCATIONS;

const {POST_WORKEXPERIENCE,GET_WORKEXPERIENCE,DELETE_WORKEXPERIENCE,UPDATE_WORKEXPERIENCE,UPDATED_WORKEXPERIENCE} = require("../utils/constants/app_constants").ROUTES.STUDENT.WORKEXPERIENCE;

const {APPLIED,GET_APPLIED} = require("../utils/constants/app_constants").ROUTES.STUDENT.INTERNSHIPS;

const {DETAILS} = require("../utils/constants/app_constants").ROUTES.STUDENT.DETAILSONE;



const Handler = require("../ErrorHandling/StudentInfo/InfoError");

// getAll Data

router.route(PROFILE_DETAIL).get(allStudentData);

// achievement route

router.route(POST_ACHIEVEMENT).post(Handler.achievement,studentAchievement);

router.route(GET_ACHIEVEMENT).get(getAchievementInfo);

router.route(DELETE_ACHIEVEMENT).delete(deleteAchievement);

router.route(UPDATE_ACHIEVEMENT).get(updateAchievement);

router.route(UPDATED_ACHIEVEMENT).put(Handler.updatedAchievement,updatedAchievement);

//project routes

router.route(POST_PROJECT).post(Handler.project,studentProject);

router.route(GET_PROJECT).get(getProjectsInfo);

router.route(DELETE_PROJECT).delete(deleteProject);

router.route(UPDATE_PROJECT).get(updateProject);

router.route(UPDATED_PROJECT).put(Handler.updatedProject,updatedProject);

 
//education route

router.route(POST_EDUCATION).post(Handler.education,studentEducation);

router.route(GET_EDUCATION).get(getEducationInfo);

router.route(DELETE_EDUCATION).delete(deleteEducation)

router.route(UPDATE_EDUCATION).get(updateEducation)

router.route(UPDATED_EDUCATION).put(Handler.updatedEducation,updatedEducation)

// workexperience route

router.route(POST_WORKEXPERIENCE).post(Handler.workexperience,studentWorkExperience);

router.route(GET_WORKEXPERIENCE).get(getWorkExperienceInfo);

router.route(DELETE_WORKEXPERIENCE).delete(deleteWorkExperience);

router.route(UPDATE_WORKEXPERIENCE).get(updateWorkExperience);

router.route(UPDATED_WORKEXPERIENCE).put(Handler.updatedWorkexperience,updatedWorkExperience);

//detailsone route

router.route(DETAILS).post(Handler.detailsOne,detailsOne);

//profile health Route

router.route(PROFILEHEALTH).get(profileHealth)

//edit profile

router.route(EDIT_PROFILE).put(Handler.editProfiledetails,editProfileDetails);

router.route(APPLIED).post(appliedInternship);

router.route(GET_APPLIED).get(getappliedInternship);

module.exports = router