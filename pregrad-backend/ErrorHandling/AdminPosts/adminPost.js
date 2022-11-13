
module.exports = {

    testimonials(req,res,next){
 
        const errors = {};

        const {name,description,image_link,college_name} = req.body;

    if(!name){
      errors.name = "Name required";
    }else if(name.length < 2){
      errors.name = "Minimum 2 characters required";
    }else if(name.length > 18){
      errors.name = "Maximum 18 characters required";
    }

    if(!image_link){
        errors.imagelink = "Image Link required"
    }

    if(!college_name){
      errors.college = "Company name required";
    }else if(college_name.length < 2){
      errors.college = "Minimum 2 characters required";
    }else if(college_name.length > 28){
      errors.college = "Maximum 28 characters required";
    }

    if(!description){
      errors.description = "Description required"
    }

    if(Object.keys(errors).length === 0){
        next();
    }
    else{

        res.send({errors:errors}) ;
    }
    },
    cources(req,res,next){

      const errors = {};

      const {name,enrolled,instructor,instructordetail,fee,rating,courselink,imagelink} = req.body;

      if(!name){
        errors.name = "Name required";
      }else if(name.length < 2){
        errors.name = "Minimum 2 characters required";
      }else if(name.length > 18){
        errors.name = "Maximum 18 characters required";
      }
  
      if(!imagelink){
          errors.imagelink = "Image link required"
      }
  
      if(!instructor){
        errors.instructor = "Instructor name required";
      }else if(instructor.length < 2){
        errors.instructor = "Minimum 2 characters required";
      }else if(instructor.length > 18){
        errors.instructor = "Maximum 18 characters required";
      }
  
      if(!instructordetail){
        errors.instructordetail = "Instructor detail required"
      }else if(instructordetail.length < 2){
        errors.instructordetail = "Minimum 2 characters required";
      }else if(instructordetail.length > 28){
        errors.instructordetail = "Maximum 28 characters required";
      }
  
      if(!rating){
        errors.rating = "Course rating required"
      }else if(rating < 1){
        errors.rating = "Rating should be greater than 1"
      }else if(rating > 5){
        errors.rating = "Rating should be less than 5"
      }
  
      if(!fee){
        errors.fee = "Course fee required"
      }
  
      if(!enrolled){
        errors.enrolled = "Students enrolled required"
      }
  
      if(!courselink){
        errors.courselink = "Course link required"
      }
  
      if(Object.keys(errors).length === 0){
        next();
      }
      else{
        return res.send({errors:errors});
      }

    },
    events(req,res,next){

      const errors = {};

      const {name,imagelink,speaker,organisation,date,eventlink,time} = req.body;

      if (! name) {
        errors.name = "Name required";
      } else if ( name.length < 2) {
        errors.name = "Minimum 2 characters required";
      } else if ( name.length > 28) {
        errors.name = "Maximum 28 characters required";
      }
  
      if (! imagelink) {
        errors.imagelink = "Image link required";
      }
  
      if (! speaker) {
        errors.speaker = "Speaker name required";
      } else if ( speaker.length < 2) {
        errors.speaker = "Minimum 2 characters required";
      } else if ( speaker.length > 18) {
        errors.speaker = "Maximum 18 characters required";
      }
  
      if (! organisation) {
        errors.organisation = "Organisation name required";
      } else if ( organisation.length < 2) {
        errors.organisation = "Minimum 2 characters required";
      } else if ( organisation.length > 28) {
        errors.organisation = "Maximum 28 characters required";
      }
  
      if (! date) {
        errors.date = "Date of event required";
      }
  
      if (! time) {
        errors.time = "Time of event required";
      }
  
      if (! eventlink) {
        errors.eventlink = "Event link required";
      }
  
      if(Object.keys(errors).length === 0){
        next();
      }
      else{
        return res.send({errors:errors});
      }
    }

}