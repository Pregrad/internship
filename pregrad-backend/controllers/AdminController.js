const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const Company = require("../models/companyModel");
const Internship = require("../models/internshipModel");
const Student = require("../models/userModel");
const AppContent = require("../models/AppModel");

module.exports.registerAdmin = async(req,res)=>{

   const {name,password,email} = req.body;

   const admin = await Admin.findOne({email});

   if(admin){
     return res.send({message:"Admin already registered"});
   }
   else{

    const hashPassword = await bcrypt.hash(password,10);

      const newAdmin = new Admin({
        name,
        password:hashPassword,
        email
      })

      await newAdmin.save();

      return res.send({ message: "true" });
   }
   
} 

module.exports.AdminInfo = async(req,res)=>{

  try{

    const {id} = req.params;

    const adminInfo = await Admin.findById({_id:id});

   res.send(adminInfo);

  }
  catch(err){
    console.log(err);
  }
 

}

module.exports.verifiedCompany = async(req,res)=>{
  try{

    const {id} = req.params;

    const date = new Date();

    const admin = await Admin.findById({_id:id});

    req.body.map(async(e)=>{
      if(e.status === true){

         admin.Company_Verification.push({
            company_id:e._id,
            company_name:e.companyname,
            status:"Blocked",
            verifiedAt: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

          })

        const company = await Company.findByIdAndUpdate({_id:e._id},{
          $set:{
            isAuthorized:"Blocked"
          }
        });
  
     
      }else if(e.status === false){

        admin.Company_Verification.push({
          company_id:e._id,
          company_name:e.companyname,
          status:"Verified",
          verifiedAt: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        })

      const company = await Company.findByIdAndUpdate({_id:e._id},{
        $set:{
          isAuthorized:"Verified"
        }
      });

      }
    })
    await admin.save();

    res.send({status:true})
   
  }catch(err){
    console.log(err);
  }
}

module.exports.reportedInternship = async(req,res)=>{
 
  try{

    const reported = await Internship.find({});

    let reportedArray = [];

    reported.map((e)=>{
      if(e.reports.length>0){
        reportedArray.push(e);
      }
    })
   res.send(reportedArray);

  }catch(err){
    console.log(err);
  }
  
}

module.exports.reports = async(req,res)=>{

  try{
    const {i_id} = req.params;

    const report = await Internship.findById({_id:i_id});

    report.reports.map(async(e,i)=>{
        const student = await Student.findById({_id:e.student_id});
        e["name"] = student.name;
    })

    await report.save();

    res.send(report.reports);

  }catch(err){
    console.log(err);
  }
}

module.exports.VerifiedRepotedInternship = async(req,res)=>{

  try{

    const reported = req.body;

    const date = new Date();

    const {id} = req.params;

    const admin = await Admin.findById({_id:id});

    reported.map(async(e)=>{
      if(e.flag === true){

        admin.reports.push({
          internship_id:e._id,
          internship_title:e.title,
          status:"Blocked",
          verifiedAt: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        })

        const internship = await Internship.findByIdAndUpdate({_id:e._id},{
          $set:{
            reports:[],
            isBlocked:true
          }
        })
      }
      else if(e.flag === false){

        admin.reports.push({
          internship_id:e._id,
          internship_title:e.title,
          status:"Allowed",
          verifiedAt: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

        })

        const internship = await Internship.findByIdAndUpdate({_id:e._id},{
          $set:{
            reports:[],
            isBlocked:false
          }
        })
      }
      })

      await admin.save();

      res.send({status:true})

  }catch(err){
     console.log(err);
  }

}

module.exports.createTestimoials = async(req,res)=>{

  try{


    const {name,college_name,image_link,description} = req.body;
    
    const {id} = req.params;

    const adminTestimonials = await AppContent.findOne({id:id});

    if(adminTestimonials){

      const updateadminTestimonials = await AppContent.updateOne({
        $push:{
          testimonials:{
            name,
            college_name,
            image_link,
            description
        }
        }
        
      })
  

    }else{

      const createadminTestimonials = await AppContent.create({
        id,
        testimonials:{
          name,
          college_name,
          image_link,
          description
        }
      })

      await createadminTestimonials.save();

    }
  
  res.send({message:true});

  }catch(err){
    console.log(err);
  }

}

module.exports.getTestimonials = async(req,res)=>{

  try{

    const {id} = req.params;

    const appTestimonials = await AppContent.findOne({id:id});

    if(appTestimonials){

      res.send({message:true,testimonials:appTestimonials.testimonials});
    }
    else{
      res.send({message:false});
    }

 

  }catch(err){
    console.log(err);
  }

}

module.exports.deleteTestimonial = async(req,res)=>{

  try{

    const {id,t_id}= req.params;
    
    const deleteTestimonial = await AppContent.updateOne({id:id},{
      $pull:{
       testimonials:{ 
        _id:t_id
      }
      }
    });

    res.send({message:true});
  

  }catch(err){
    console.log(err);
  }
 

}

module.exports.addCources = async(req,res)=>{
  try{


    const {name,enrolled,instructor,instructordetail,fee,rating,courselink,imagelink} = req.body;

    const {id} = req.params;

    const adminCources = await AppContent.findOne({id:id});

    if(adminCources){

      const updateadminCources = await AppContent.updateOne({
        $push:{
          cources:{
            name,
            enrolled,
            instructor,
            instructordetail,
            fee,
            rating,
            courselink,
            imagelink
        }
        }
        
      })
  

    }else{

      const createadminCources = await AppContent.create({
        id,
        cources:{
            name,
            enrolled,
            instructor,
            instructordetail,
            fee,
            rating,
            courselink,
            imagelink
        }
      })

      await createadminCources.save();

    }
  
  res.send({message:true});

  }catch(err){
    console.log(err);
  }

}

module.exports.showCources = async(req,res)=>{
  try{

    const {id} = req.params;

    const appCources = await AppContent.findOne({id:id});

    if(appCources){

      res.send({message:true,cources
        :appCources.cources
      });
    }
    else{
      res.send({message:false});
    }

 

  }catch(err){
    console.log(err);
  }

}

module.exports.deleteCources = async(req,res)=>{
  try{

    const {id,c_id}= req.params;
    
    const deleteCources = await AppContent.updateOne({id:id},{
      $pull:{
       cources:{ 
        _id:c_id
      }
      }
    });

    res.send({message:true});

  }catch(err){
      console.log(err);
  }
}

module.exports.addEvents = async(req,res)=>{

  try{

    const {name,imagelink,speaker,organisation,date,eventlink,time} = req.body;

    const {id} = req.params;

    const createEvent = await AppContent.findOne({id:id});

    if(createEvent){

      const updatecreateEvent = await AppContent.updateOne({
        $push:{
          events:{
            name,
            imagelink,
            speaker,
            organisation,
            date,
            eventlink,
            time
        }
        }
        
      })
  

    }else{

      const createcreateEvent = await AppContent.create({
        id,
        events:{
          name,
          imagelink,
          speaker,
          organisation,
          date,
          eventlink,
          time
        }
      })

      await createcreateEvent.save();

    }
  
  res.send({message:true});


  }catch(err){
    console.log(err);
  }

}

module.exports.showEvents = async(req,res)=>{

  try{

    const {id} = req.params;

    const appEvent = await AppContent.findOne({id:id});

    if(appEvent){

      res.send({message:true,events:appEvent.events});
    }
    else{
      res.send({message:false});
    }

  }catch(err){
    console.log(err)
  }

}

module.exports.deleteEvents = async(req,res)=>{
  try{

    const {id,e_id}= req.params;
    
    const deleteEvents = await AppContent.updateOne({id:id},{
      $pull:{
       events:{ 
        _id:e_id
      }
      }
    });

    res.send({message:true});

  }catch(err){
    console.log(err);
  }
}

module.exports.homeCources = async(req,res)=>{
  try{

    const extras = await AppContent.find({});

    if(extras){
      res.send({data:extras});
    }
    else{
       res.send({message:false});
    }

  }catch(err){
    console.log(err);
  }
}

module.exports.allAdmins = async(req,res)=>{
  try{

    const admins = await Admin.find({role:"admin"});

    res.send({admin:admins});

  }catch(err){
    console.log(err);
  }
}

module.exports.deleteAdmin = async(req,res)=>{
  try{

    const {a_id} = req.params;
    
    const deleteadmin =  await Admin.findByIdAndDelete({_id:a_id});

    if(deleteadmin){
      res.send({message:true});
    }
    else{
      res.send({message:false});
    }

  }catch(err){
   console.log(err);
  }
} 