module.exports = {
    
    detailsOne(req,res,next){

    const errors = {};

    if(!req.body.user.linkedin){
      errors.linkedin = "Linkedin Id required";
    }

    if(!req.body.selectedType){
        errors.type = "Company type required"
    }

    if(!req.body.user.year){
        errors.year = "Year of establishment required"
    }else if(req.body.user.year.length !== 4){
        errors.year = "Invalid Year"
    }

    if(!req.body.selectedLocation){
        errors.location = "Location required"
    }

    if(!req.body.user.about){
      errors.about = "About company required"
    }

    if(Object.keys(errors).length === 0){
        next();
      }
      else{
        return res.send({errors:errors});
      }
    },
    addInternship(req,res,next){

        const errors = {};

        if(!req.body.selectedTitles){
          errors.title = "Internship title required"
        }
    
        if(!req.body.selectedOfficeType){
          errors.officetype = "Office type required"
        }
    
        if(req.body.selectedSkills.length < 3){
          errors.skills = "Minimum 3 skills required"
        }
    
        if(!req.body.info.positions){
          errors.positions = "No. of positions required"
        }else if(req.body.info.positions < 1){
          errors.positions = "Minimum 1 position required"
        }else if(req.body.info.positions > 50){
          errors.positions = "Maximum 50 positions allowed"
        }
    
        if(!req.body.selectedDuration){
          errors.duration = "Duration of internship required"
        }
    
        if(!req.body.selectedMode){
          errors.mode = "Internship mode required"
        }
    
        if(!req.body.selectedExperience){
          errors.experience = "Experience required"
        }
    
        if(!req.body.info.startdate){
          errors.startdate = "Tentative start date required"
        }
    
        if(!req.body.info.minstipend){
          errors.minstipend = "Minimum stipend required"
        }else if(req.body.minstipend < 2000){
          errors.minstipend = "Minimum 2000 stipend required"
        }
    
        if(!req.body.info.maxstipend){
          errors.maxstipend = "Maximum stipend required"
        }else if(parseFloat(req.body.maxstipend) <= parseFloat(req.body.minstipend)){
          errors.maxstipend = "Maximum stipend should be greater than minimum"
        }
    
        if(!req.body.info.about){
          errors.about = "Description of internship required"
        }

        if(Object.keys(errors).length === 0){
            next();
          }
          else{
            return res.send({errors:errors});
          }
    },
    profile(req,res,next){

        const errors = {};

        if(!req.body.companyInfo.linkedinlink){
             errors.linkedinlink = "Linkedin Id required";
        }

        if(!req.body.selectedType){
            errors.type = "Company Type required";
        }

        if(!req.body.selectedLocation){
            errors.location = "Location required";
        }

        if(!req.body.companyInfo.about){
            errors.about = "About company required";
        }

        if(Object.keys(errors).length === 0){
            next();
          }
          else{
            return res.send({errors:errors});
          }
       
    },
    account(req,res,next){

        const errors = {};
        
        console.log(req.body)

        if(!req.body.name){
          errors.name = "Name Required"
        }else if(req.body.name.length < 3){
          errors.name = "Minimum 3 characters required"
        }else if(req.body.name.length > 18){
          errors.name = "Maximum 18 characters required";
        }
    
        if(!req.body.companyname){
          errors.companyname = "Company name required"
        }else if(req.body.companyname.length < 2){
          errors.companyname = "Minimum 2 characters required"
        }else if(req.body.companyname.length > 18){
          errors.companyname = "Maximum 18 characters required";
        }
        
        if(!req.body.designation){
          errors.designation = "Designation required"
        }else if(req.body.designation.length > 20){
          errors.designation = "Maximum 20 characters required";
        }
    
        if(!req.body.mobile){
          errors.mobile = "Mobile number required"
        }else if(req.body.mobile.toString().length !== 10){
          errors.mobile = "Mobile number is Invalid";
        }
     
        if(Object.keys(errors).length === 0){
            next();
          }
          else{
            return res.send({errors:errors});
          }
       
        
    },
    report(req,res,next){

      let error = "";

    const {description} = req.body;

      if(!description){
            error = "Description is required";
      }

      if(error === ""){
        next();
      }
      else{
        return res.send({error:error});
      }
    }
}