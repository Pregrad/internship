const express = require("express");
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const maxAge = 3*24*60*60
require('../config/passportGoogle')

const { signup, login,verifyEmail,verifyOtp,newPassword,getUserDetails} = require("../controllers/authControllers");

const {CheckUser} = require('../Middleware/AuthMiddleware');

const {CheckCompany} = require('../Middleware/AuthMiddlewareCompany');

const Handler = require("../ErrorHandling/Authentication/AuthError").STUDENT;

const { 
  SIGNUP,
  LOGIN,
  VERIFYEMAIL,
  VERIFYOTP,
  STUDENT,
  COMPANY,
  NEWPASSWORD,
  USERDETAILS
} = require("../utils/constants/app_constants").ROUTES.AUTH;

const createToken =(id)=>{

    return jwt.sign({id},"AnuragPandey",{
      expiresIn:maxAge
    })  
  }
  
router.route(SIGNUP).post(Handler.register,signup);

router.route(LOGIN).post(Handler.login,login);

router.route(VERIFYEMAIL).post(Handler.verifyEmail,verifyEmail);

router.route(VERIFYOTP).post(Handler.otpVerify,verifyOtp);

router.route(STUDENT).post(CheckUser);

router.route(COMPANY).post(CheckCompany); 

router.route(NEWPASSWORD).post(Handler.forgotPassword,newPassword);

router.route(USERDETAILS).get(getUserDetails);

// router.route('/auth/google').get(passport.authenticate('google',{
//     scope:['profile','email']
// }))

// router.route('/auth/google/callback').get(passport.authenticate('google',{
//     successRedirect:`/auth/google/success`,
//     failureRedirect:"http://localhost:3000/login"
// })) 

// router.route('/auth/google/success').get((req,res,next)=>{

//     const token = createToken(req.user._id)
//     res.cookie("jwt",token,{
//       withCredentials:true,
//       httpOnly:false,
//       maxAge:maxAge*1000
//     })
//     req.type = "google"
//     req.token = token
// next()

// },CheckUser)


// router.get('/logout', (req, res, next) => {
  
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     } 
//     res.status(202).clearCookie('jwt',{path:'/'}).send("cookie cleared")
//   });
// });

module.exports = router;