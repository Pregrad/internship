module.exports = {

    detailsOne(req,res,next){
        const errors = {};
        if(!req.body.selectedCollege){
          errors.college = "College name required"
        }
    
        if(!req.body.selectedYear){
          errors.year = "Year of graduation required"
        }
    
        if(req.body.selectedDomains.length < 1){
          errors.domain = "Minimum 1 domain required"
        }
    
        if(req.body.selectedSkills.length < 3){
          errors.skills = "Minimum 3 skills required"
        }
    
        if(!req.body.selectedLocation){
          errors.location = "Work location required"
        }
    
        if(!req.body.socialLink.linkedin){
          errors.linkedin = "Link required";
        }

        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
       
    },
    achievement(req,res,next){
        const errors = {};

        const {title,certificate} = req.body;

        if(!title){
          errors.title = "Name required";
        }else if(title.length < 3){
          errors.title = "Min 3 characters required";
        }
    
        if(!certificate){
          errors.certificate = "Certificate link required";
        }

        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
       
    },
    updatedAchievement(req,res,next){
        const errors = {};

        const {title,certificate} = req.body
    
        if(!title){
            errors.title = "Name required";
        }else if(title.length < 3){
            errors.title = "Min 3 characters required";
        }
        if(!certificate){
            errors.certificate = "Certificate link required";
        }
        
        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
       
    },
    project(req,res,next){

        const {projecttitle,description,skills,projectlink} = req.body;
        console.log(projecttitle,description,skills,projectlink)
        const errors = {};

  
        if(!projecttitle){
          errors.projecttitle = "Title required";
        }
    
        if(!description){
          errors.description = "Description required";
        }

        if(skills.length < 3 ){
            errors.skills = "Minimum 3 skills required";
        }
    
        if(!projectlink){
          errors.projectlink = "Project Link required";
        }
    
        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
       
    },
    updatedProject(req,res,next){
        const errors = {};

        const {projecttitle,description,projectlink,skills} = req.body;
        
         if(!projecttitle ){
           errors.projecttitle = "Title Required";
         }
         if(!description){
                errors.description = "Description required";
         }
         if(skills.length < 3){
            errors.skills = "Minimum 3 skills required";
         }
         if(!projectlink){
            errors.projectlink = "Project Link required";
         }

        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
      
    },
    education(req,res,next){

        const  errors = {};

        const {university,field,start,end,degree} = req.body;

        if(!university){
            errors.university = "Name required";
          }
      
          if(!field){
            errors.field = "Field of study required";
          }
      
          if(!degree){
            errors.degree = "Degree required";
          }
      
          if(!start){
            errors.start = "Start year required";
          }else if(start.length !== 4 || (!Number.isInteger(parseFloat(start))) || (isNaN(start))){
            errors.start = "Invalid Year";
          }
      
          if(!end){
            errors.end = "End year required";
          }else if(end.length !== 4 || (!Number.isInteger(parseFloat(end))) || (isNaN(end))){
            errors.end = "Invalid Year";
          }
      
          if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }

    },
    updatedEducation(req,res,next){

        const errors = {};

        const {university,field,end,start,degree} = req.body;

        if(!university){
            errors.university = "Name required";
        }
        if(!field){
                errors.field = "Field of study required";
        }
        if(!end){
            errors.end = "End year required";
        }
        else if(end.length !== 4 || (!Number.isInteger(parseFloat(end))) || (isNaN(end))){
            errors.end = "Invalid Year";
          }
        if(!start){
            errors.start = "Start year required";
        }
        else if(start.length !== 4 || (!Number.isInteger(parseFloat(start))) || (isNaN(start))){
            errors.start = "Invalid Year";
          }
        if(!degree){
            errors.degree = "Degree required";
        }

        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          } 
    },
    workexperience(req,res,next){

        const errors = {};

        const {companyname,websitelink,position,skills,role,duration} = req.body;
      
          if(!companyname){
            errors.companyname = "Name required";
          }
      
          if(!position){
            errors.position = "Position of responsibility required";
          }
          
          if(!role){
            errors.role = "Description of role required";
          }
      
          if(!duration){
            errors.duration = "Duration required";
          }else if(parseInt(duration) < 1){
            errors.duration = "Duration should be greater than 1"
          }else if(!Number.isInteger(parseFloat(duration))){
            errors.duration = "Duration should not be in decimal"
          }
      
          if(!websitelink){
            errors.websitelink = "Website Link required";
          }
      
          if(skills.length < 3){
            errors.skills = "Minimum 3 skills required"
          }

          if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
    },
    updatedWorkexperience(req,res,next){

        const errors = {};

        const {companyname,websitelink,position,skills,role,duration} = req.body;

        if(!companyname){
            errors.companyname = "Name required";
          }
          if(!websitelink){
                 errors.websitelink = "Website Link required";
          }
          if(skills.length < 3){
             errors.skills = "Minimum 3 skills required";
          }
          if(!position){
             errors.position = "Position of responsibility required";
          }
          if(!role){
            errors.role = "Description of role required";
          }
          if(!duration){
            errors.duration = "Duration required";
          }
          else if(duration < 1){
            errors.duration = "Duration should be greater than 1"
          }else if(!Number.isInteger(parseFloat(duration))){
            errors.duration = "Duration should not be in decimal"
          }

          if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
    },
    editProfiledetails(req,res,next){

        const errors = {};

        if(!req.body.links.linkedin){
               errors.linkedin = "LinkedIn is required";
        }

        if(req.body.selectedSkills.length < 3){
            errors.skills = "Minimum 3 skills  required";
        }

        if(!req.body.data.name){
            errors.name = "Name is required";
        }
        else if(req.body.data.name.length<2){
            errors.name = "Minimum 2 characters required";
        }
        else if(req.body.data.name.length > 18){
            errors.name = "Maximum 18 characters required";
        }

        if(!req.body.selectedDomains){
            errors.domain = "Domain is required";
        }

        if(Object.keys(errors).length === 0){
            next();
          }else{
            return res.send({errors:errors});
          }
    }
}