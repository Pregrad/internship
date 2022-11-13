const Company = require('../models/companyModel')
const bcrypt = require("bcryptjs");
const UserRegister = require("../models/userModel");
const CompanyInfo = require("../models/companyInfoModel");
const Internship = require('../models/internshipModel');

module.exports.registerCompany = async(req,res)=>{
  try{

  const {name,designation,email,companyname,mobile,password} = req.body

  const user = await UserRegister.findOne({email})

  const company = await Company.findOne({email})

  if(user){
    res.send({
      message:"Already registered"
     })
  }
  else if(company){
     res.send({
      message:"Already registered"
     })
  }else{

     const hashPassword = await bcrypt.hash(password,10)

     const newCompany = await Company.create({
      name,
      designation,
      email,
      companyname,
      phoneno:mobile,
      password:hashPassword
     })
     await newCompany.save()

     res.send({
      message:"true"
     })
  }

}catch(err){
  console.log(err)
}
}

module.exports.getCompanyInfo = async(req,res)=>{
    const {id} = req.params

    const company = await Company.findOne({_id:id})

    if(company){
       res.send({
          name:company.name,
          companyname:company.companyname,
          verified:company.detailFlag,
          email:company.email,
          designation:company.designation,
          phoneno:company.phoneno,
          isAuthorized:company.isAuthorized
       })
    }else{
      res.send({
        message:"Company Not found"
      })
    }
}


module.exports.companyDetails = async(req,res)=>{
  try{

    const {id} = req.params

   const newCompanyInfo = await CompanyInfo.create({
    id,
    linkedin:req.body.user.linkedin,
    websitelink:req.body.user.companylink,
    typeofcompany:req.body.selectedType,
    established:req.body.user.year,
    headquaters:req.body.selectedLocation,
    description:req.body.user.about
   })

   await newCompanyInfo.save()

   const company = await Company.findByIdAndUpdate({_id:id},{
    $set:{
        detailFlag:true
    }
},{
  new:true
})

res.send({message:"true",verified:company.detailFlag})

}catch(err)
{
  console.log(err)
}
 
}

module.exports.getCompanyDetails = async(req,res)=>{
  try{
    const {id} = req.params

    const company = await CompanyInfo.findOne({id})
  
    if(company){
      res.send(company)
    }
  }catch(err){
    console.log(err)
  }

}

module.exports.editProfile = async(req,res)=>{
  
  try{
    const {id} = req.params

    const profile = await CompanyInfo.findOneAndUpdate({id},{
      $set:{
        linkedin:req.body.companyInfo.linkedinlink,
        typeofcompany:req.body.selectedType,
        headquaters:req.body.selectedLocation,
        description:req.body.companyInfo.about,
        websitelink:req.body.companyInfo.websitelink
      }
    })

    res.send({message:true});

  }catch(err){
    console.log(err)
  } 

}

module.exports.editAccount = async(req,res)=>{

  try{
    const {id} = req.params
    
    
    const company = await Company.findById({_id:id});


    if(company){

    company.name = req.body.name;
    company.companyname = req.body.companyname;
    company.designation = req.body.designation;
    company.phoneno = req.body.mobile;
    }
    
    await company.save();

    res.send({message:true});
  }catch(err){
    console.log(err);
  }
  

}

module.exports.getInternships = async(req,res)=>{
try{
  const {id} = req.params

  const internship = await Internship.find({id})

  if(internship){
   
    res.send(internship)
  }else{
    res.send("No Internships")
  }
}catch(err){
  console.log(err)
}
  

}

module.exports.unAuthorizedCompany = async(req,res)=>{
 
  try{

    const company = await Company.find({isAuthorized:"Applied"});

    res.send(company);
    
  }
  catch(err){
     console.log(err);
  }
  
}