const Internship = require('../models/internshipModel')
const Company = require('../models/companyModel')
const CompanyInfo = require("../models/companyInfoModel")
const UserRegister = require("../models/userModel");
const StudentInfo = require("../models/UserInfoModel");

module.exports.createInternship = async(req,res)=>{
try{
     const {id} =req.params

    console.log(req.body)

    const newinternship = await Internship.create({
     id,
     title:req.body.selectedTitles,
     noofemployees:req.body.info.positions,
     jobtype:req.body.selectedOfficeType,
     jobmode:req.body.selectedMode,
     description:req.body.info.about,
     duration:req.body.selectedDuration,
     perks:{
          letter:req.body.letterCheckbox,
          certificate:req.body.certiCheckbox,
          job:req.body.jobCheckbox,
          bonus:req.body.bonusCheckbox
     },
     stipend:{
          maximum:req.body.info.maxstipend,
          minimum:req.body.info.minstipend
     },
     skills:req.body.selectedSkills,
     experience:req.body.selectedExperience,
     startfrom:req.body.info.startdate
    })

    await newinternship.save();

    res.send({message:true});

}catch(err){
     console.log(err)
}
}

module.exports.Internship = async(req,res)=>{
try{ 
     const {id} =req.params;

     const internship = await Internship.findOne({_id:id});

     if(internship){
          res.send(internship);
     }else{
          res.send("No internship");
     }
}catch(err){
     console.log(err)
}
     
}

module.exports.singleInternship = async(req,res)=>{
     try{

          const {id} = req.params

          const internship = await Internship.findOne({_id:id}) 

          if(internship){

               res.send(internship)
          }else{
              res.send("No Internship")
          }

     }catch(err){
       console.log(err)
     }
}

module.exports.editInternship = async(req,res)=>{
     try{

          const {id} = req.params

          const internship = await Internship.findOneAndUpdate({_id:id},{
               $set:{
                 title:req.body.selectedTitles,
                 noofemployees:req.body.info.positions,
                 jobtype:req.body.selectedOfficeType,
                 jobmode:req.body.selectedMode,
                 description:req.body.info.about,
                 duration:req.body.selectedDuration,
        perks:{
           letter:req.body.letterCheckbox,
           certificate:req.body.certiCheckbox,
           job:req.body.jobCheckbox,
           bonus:req.body.bonusCheckbox
        },
        stipend:{
          maximum:req.body.info.maxstipend,
          minimum:req.body.info.minstipend
     },
     skills:req.body.selectedSkills,
     experience:req.body.selectedExperience,
     startfrom:req.body.info.startdate

               }
          })

          res.send({message:true});
          
     }catch(err){
          console.log(err)
     }

}

module.exports.closeInternship = async(req,res)=>{
     try{
          const {id} = req.params
          
          const internship = await Internship.findOneAndUpdate({_id:id},{
               $set:{
                    status:!req.body.status
               }
          },{
               new:true
          })

          res.send({message:"true"})

     }catch(err){
          console.log(err)
     }
    
}

module.exports.allInternship = async(req,res)=>{
   try{

     // let {page,size} = req.query

     // const limit = parseInt(size)

     // const skip = (page-1)*size;
 
     // const internships = await Internship.find({}).limit(limit).skip(skip)

     // console.log(req.params.id)

     const internships = await Internship.find();

     // console.log(internships)

     const allInternship = [];

     let j=0;
     
     for(let i=0;i<internships.length;i++){

          const company = await Company.findOne({_id:internships[i].id})

          const companyinfo = await CompanyInfo.findOne({id:internships[i].id});
      
          if(internships[i].applied.find(e=>e.id === req.params.id) === undefined){
               // internships[i] = {...internships[i],companyname:company.companyname,headquaters:companyinfo.headquaters}
               allInternship[j] = {...allInternship[j],main:internships[i],companyname:company.companyname,headquaters:companyinfo.headquaters
                    }
               j++;

          }

          // internships[i] = {...internships[i],companyname:company.companyname,headquaters:companyinfo.headquaters}
   
     }

     // console.log(allInternship)
//   
     if(internships){
          
          res.send(allInternship)
     }else{
          res.send("Server Error")
     }
   }catch(err){
     console.log(err)
   }  
     
}

module.exports.getApplicants = async(req,res)=>{
try{
     const {id} = req.params

    const internship = await Internship.findOne({_id:id})

    let appliedApplicants = [];

    let shortlistedApplicants = [];
  
    let hiredApplicants = [];
   
//     let countApplied = 0;

//     let countShortlist = 0;

//     let countHired = 0;
    

    for(let i=0;i<internship.applied.length;i++){

         const student = await UserRegister.findOne({_id:internship.applied[i].id})
       
          if(internship.applied[i].status === "Applied"){
          //    ++countApplied;
             appliedApplicants.push({id:student._id,name:student.name,internshipstatus:internship.applied[i].status})
          }
          else if(internship.applied[i].status === "Shortlisted"){
               // ++countShortlist;
               shortlistedApplicants.push({id:student._id,name:student.name,internshipstatus:internship.applied[i].status})
          }
          else if(internship.applied[i].status === "Hired"){
               // ++countHired;
               hiredApplicants.push({id:student._id,name:student.name,internshipstatus:internship.applied[i].status})
          }
    }
 
          res.send({

               appliedCandidates:appliedApplicants,
               shortlistedCandidates:shortlistedApplicants,
               hiredCandidates:hiredApplicants,
               // appliedLength:countApplied,
               // shortlistLength:countShortlist,
               // hiredLength:countHired,

          })

}catch(err){
     console.log(err)
}
}

module.exports.rejectedApplicants = async(req,res)=>{

     const {id} = req.params;

     let count = 0;
     
     const rejected = req.body.filter((e)=>e.status === true)


     const shortlisted = req.body.filter((e)=>e.status === false)


     rejected.map(async(e)=>{

       const internship = await Internship.updateOne({_id:id,"applied.id":e.id},{
          $set:{
               "applied.$.status":"Rejected"
          }
       },{
          new:true
       })
     })

     shortlisted.map(async(e)=>{

          const internship = await Internship.updateOne({_id:id,"applied.id":e.id},{
             $set:{
                  "applied.$.status":req.query.type
             }
          },{
             new:true
          })
        })

     res.send({status:true})

}

module.exports.reportInternship = async(req,res)=>{
     try{
          
          const {id,i_id} = req.params;

          const {description} = req.body;
           
          const internship = await Internship.updateOne({
               _id:i_id,
               'reports.student_id':{
                    '$ne':id
               }
          },{
               $addToSet:{
                  reports:{
                    student_id:id,
                    description:description
                  }
               }
          });
          
        const student = await StudentInfo.findOneAndUpdate({id},{
          $addToSet:{
               reports:i_id
          }
        });

     res.send({success:true});

     }catch(err){
          console.log(err);
     }
}