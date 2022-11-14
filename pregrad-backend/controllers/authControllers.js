const UserRegister = require("../models/userModel");
const Otp = require('../models/OtpVerifyModel');
const Company = require('../models/companyModel');
const Admin = require("../models/adminModel");
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const bcrypt = require('bcryptjs')


const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60

const createToken =(id)=>{

  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:maxAge
  })
}

const oAuth2Client = new google.auth.OAuth2(process.GOOGLE_CLIENTID,process.env.GOOGLE_SECRET,process.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})


const sendOtpToVerify = async({email})=>{
 
  try{
    // transporter basicaaly create a gmail service where you could send the mail on gmail accounts.This requires Client Id and Client Secret 
    //  which can be generated on google developers page. 

    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        type:"OAuth2",
        user:process.env.AUTH_EMAIL,
        clientId:process.env.GOOGLE_CLIENTID,
        clientSecret:process.env.GOOGLE_SECRET,
        refreshToken:process.env.REFRESH_TOKEN  
      }
    })         
    
    const otp = await generateOtp({ email });

    // mailOptions contain all the necessary information required to send the email.
    const mailOptions={
      from:`Pregrad <${process.env.GMAIL}>`,
      to:email,
      subject:"Verification Email",
      text: `This is your verification code - ${otp}`,
      html: `<h1>This is your verification code - <b>${otp}</b>.</h1>`
    }

   const result = await transporter.sendMail(mailOptions)
  return result;  
  }catch(err){
    console.log(err)
  }

}

 // generate otp function will generate the otp and send the email . 

const generateOtp = async ({ email }) => {
  try {

      const otp = Math.floor(Math.random() * (10000 - 1000) + 1000);
      const expiredAt = Date.now() + 3600000;
      
      const newOtp = await Otp.create({ email, otp, createdAt: Date.now(), expiredAt });

      return otp;

  } catch (err) {
      console.log(err);
  }
}

// This is to register the user .
module.exports.signup = async (req, res) => {
  try{
    const { name, email, password, mobile } = req.body;

  const company = await Company.findOne({email})

  if(company){
   return res.send({ message: "User Already Registered" });
  }else{
    UserRegister.findOne({ email: email }, async (err, user) => {
      if (user) {
        res.send({ message: "User Already Registered" });
      } else {
        const UserData = new UserRegister({
          name: name,
          email: email,
          password: password,
          mobile: mobile,
        });
  
        await UserData.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "true" });
          }
        });
      }
    });
  }

  }catch(err){
    console.log(err) ;
  }
  
};

module.exports.verifyEmail=async(req,res)=>{
try{

  const {email} = req.body

 const user = await UserRegister.findOne({email})
 const company = await Company.findOne({email})
 const admin = await Admin.findOne({email});

  if(user)
  { 

    if(req.query.type == 'register')
    {
      if(user.verified == false)
      {
      sendOtpToVerify(user).then(res => console.log("Email sent !"))
      .catch(err => console.log(err));
      res.send({ message: "true",type:"register" });
    }else{
      res.send({ message: "Already Verified" });
    }
    }else{
      if(user.verified == true)
      {
        sendOtpToVerify(user);
        res.send({ message: "true",type:"forgotpassword" });
    }else{
      res.send({ message: "Invalid" });
    }
    }
  }
  else if(company){

    if(req.query.type == 'register')
    {
      if(company.verified == false)
      {
      sendOtpToVerify(company);
      res.send({ message: "true",type:"register" });
    }else{
      res.send({ message: "Already Verified" });
    }
    }else{
      if(company.verified == true)
      {
        sendOtpToVerify(company);
        res.send({ message: "true",type:"forgotpassword" });
    }else{
      res.send({ message: "Invalid" });
    }
    }
  }
  else if(admin){

    if(req.query.type == 'register')
    {
      if(admin.verified == false)
      {
      sendOtpToVerify(admin);
      res.send({ message: "true",type:"register" });
    }else{
      res.send({ message: "Already Verified" });
    }
    }else{
      if(admin.verified == true)
      {
        sendOtpToVerify(admin);
        res.send({ message: "true",type:"forgotpassword" });
    }else{
      res.send({ message: "Invalid" });
    }
    }
  }
  else{
    res.send({ message: "Please Enter a register Email Id" });
}
}catch(err){
  console.log(err)
}
}

// This will check the otp in the otp table whether an otp is sent to the repective user .
module.exports.verifyOtp = async(req,res)=>{
try{
  const {email,otp1,otp2,otp3,otp4} = req.body; 

  const otp = `${otp1}`+`${otp2}`+`${otp3}`+`${otp4}`;

  const user = await Otp.findOne({email});  // finding the otp in the table.

  if(user){
    if(user.expiredAt.getTime() < Date.now()) // checking the otp is expired or not .
    {
      res.send({message:"Code Expired"});
      await Otp.deleteOne({email});

    }else{

      const validOtp = await bcrypt.compare(otp,user.otp); // compare the otp with user entered otp.

      if(!validOtp){
        res.send({message:"Invalid Otp"})
        await Otp.deleteOne({email})
      }else{

        const student = await UserRegister.findOne({email});

        const company = await Company.findOne({email});

        const admin = await Admin.findOne({email});

        if(student){

        await UserRegister.updateOne({email},{$set:{  // setting the user is verified after checking whether the otp entered is correct or not .
          verified:true
        }})
         await Otp.deleteOne({email});
         res.send({message:"true"});
     }else if(company){
      await Company.updateOne({email},{$set:{
        verified:true
      }})
       await Otp.deleteOne({email});
       res.send({message:"true"});
    }else if(admin){
      await Admin.updateOne({email},{$set:{
        verified:true
      }})
       await Otp.deleteOne({email});
       res.send({message:"true"});
    }
    }
  }
}else{
  res.send({message:"Invalid Email"});
}
}catch(err){
  console.log(err);
}

}

// Login will check the check user email and password in the table.
module.exports.login = async (req, res) => {
  try{  
   
    const {email, password} = req.body;
 
    const user = await UserRegister.login(email,password);

    if(!user)
    {
      const company = await Company.login(email,password)

      if(company){
          
        const token = createToken(company._id)

        res.cookie("jwt",token,{
          withCredentials:true,
          httpOnly:false,
          maxAge:maxAge*1000
        })

        res.send({usertype:"company",id:company._id,verified:company.detailFlag})

      }else{

        const admin = await Admin.login(email,password);

        if(admin){

          const token = createToken(admin._id)

          res.cookie("jwt",token,{
            withCredentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
          })

          res.send({usertype:admin.role,id:admin._id});
        }else{

          return res.send({message:"Invalid Credentials"})
        }
    }
  }
else{
    const token = createToken(user._id)

    res.cookie("jwt",token,{
      withCredentials:true,
      httpOnly:false,
      maxAge:maxAge*1000
    })

    res.send({usertype:"student",id:user._id,verified:user.detailFlag})
  }
}catch(err){
  console.log(err)
}
    
}

// This function will store user new password in the database. 
module.exports.newPassword = async(req,res)=>{
  try{ 

    const {email,password} = req.body

    const user = await UserRegister.findOne({email})

    const company = await Company.findOne({email})

    if(user){
      const salt = await bcrypt.genSalt(10)

      const hashPassword = await bcrypt.hash(password,salt)
  
      const updateduser = await UserRegister.findOneAndUpdate({email},{$set:{
       password:hashPassword
      }})

      res.send({message:"true"})
    }
    else if(company){

      const salt = await bcrypt.genSalt(10)

      const hashPassword = await bcrypt.hash(password,salt)
  
      const updatedcompnany = await Company.findOneAndUpdate({email},{$set:{
       password:hashPassword
      }})

      res.send({message:"true"})
    }

    


}catch(err){
  console.log(err)
}
}

// This will provide all the user details .
module.exports.getUserDetails = async(req,res)=>{

  try{
    const {id} = req.params

    const user = await UserRegister.findOne({_id:id})
  
    if(user){
  
    res.send({
      name:user.name,
      email:user.email,
      verified:user.detailFlag
    })
  
  }else{
    res.send({message:"User not found"})
  }
  }catch(err){
    console.log(err)
  }
  

}