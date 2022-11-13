module.exports = {

  STUDENT:{
    register(req,res,next){

      const {name,password,email,mobile,confirmpassword} = req.body;
  
      const errors = {};
  
      const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if(!name){
        errors.name = "Name required";
      }else if(name.length < 2){
        errors.name = "Minimum 2 characters required";
      }else if(name.length > 18){
        errors.name = "Maximum 18 characters required";
      }
  
      if(!email){
        errors.email = "Email required";
      }else if(!regex.test(email)){
        errors.email = "Incorrect Email Format";
      }
  
      if(!password){
        errors.password = "Password required";
      }else if(password.length < 6){
        errors.password = "Min 6 characters required";
      }else if(password.length > 12){
        errors.password = "Max 12 characters allowed";
      }
  
      if(!mobile){
        errors.mobile = "Mobile number required"
      }else if(mobile.length !== 10){
        errors.mobile = "Mobile number is Invalid";
      }
      if(!confirmpassword){
        errors.confirmpassword = "Confirm password required";
    }else if(confirmpassword !== password){
        errors.confirmpassword = "Confirm password didn't match password"
    }
  
      if(Object.keys(errors).length === 0){
        next();
      }
      else{
        return res.send({errors:errors});
      }
      },
      login(req,res,next){
  
        const {password,email} = req.body;
  
        const errors = {};
  
        const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if(!email){
          errors.email = "Email required";
        }else if(!regex.test(email)){
          errors.email = "Incorrect Email Format";
        }
    
        if(!password){
          errors.password = "Password required";
        }else if(password.length < 6){
          errors.password = "Min 6 characters required";
        }else if(password.length > 12){
          errors.password = "Max 12 characters allowed";
        }
  
        if(Object.keys(errors).length === 0){
          next();
        }
        else{
          console.log("Returning Errors");
          return res.send({errors:errors});
      }
  
      },
      verifyEmail(req,res,next){
        const errors = {};
  
          const {email} = req.body;
  
        const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if(!email){
          errors.email = "Email required";
        }else if(!regex.test(email)){
          errors.email = "Incorrect Email Format";
        }
  
        if(Object.keys(errors).length === 0){
          next();
        }else{
          return res.send({errors:errors});
        }
      },
      otpVerify(req,res,next){
  
       const errors = {};
  
       const {email,otp1,otp2,otp3,otp4} = req.body; 
  
       const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if(!email){
        errors.email = "Email required";
      }else if(!regex.test(email)){
        errors.email = "Incorrect Email Format";
      }
  
      if(!otp1 || !otp2 || !otp3 || !otp4){
         errors.final = "All Fields are required";
      }
    
      if(Object.keys(errors).length === 0){
        next();
      }else{
        return res.send({errors:errors});
      }
  
      },
      forgotPassword(req,res,next){
  
        const errors = {};
  
        const {email,password,confirmpassword} = req.body
  
       const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if(!email){
        errors.email = "Email required";
      }else if(!regex.test(email)){
        errors.email = "Incorrect Email Format";
      }
  
      if(!password){
          errors.password = "Password required";
      }else if(password.length < 6){
          errors.password = "Min 6 characters required";
      }else if(password.length > 12){
          errors.password = "Max 12 characters required";
      }
  
      if(!confirmpassword){
          errors.confirmpassword = "Confirm password required";
      }else if(confirmpassword !== password){
          errors.confirmpassword = "Confirm password didn't match password"
      }
  
      if(Object.keys(errors).length === 0){
        next();
      }else{
        return res.send({errors:errors});
      }
  
  
      }
  },
  COMPANY:{

    register(req,res,next){

      const {name,designation,email,companyname,mobile,password,confirmpassword} = req.body

      const errors = {};

      const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if(!name){
        errors.name = "Name required";
      }else if(name.length < 2){
        errors.name = "Minimum 2 characters required";
      }else if(name.length > 18){
        errors.name = "Maximum 18 characters required";
      }
  
      if(!email){
        errors.email = "Email required";
      }else if(!regex.test(email)){
        errors.email = "Incorrect Email Format";
      }
  
      if(!companyname){
        errors.companyname = "Company name required";
      }else if(companyname.length < 2){
        errors.companyname = "Minimum 2 characters required";
      }else if(companyname.length > 18){
        errors.companyname = "Maximum 18 characters required";
      }
  
      if(!designation){
        errors.designation = "Designation required";
      }else if(designation.length > 20){
        errors.designation = "Maximum 20 characters required";
      }
  
      if(!password){
        errors.password = "Password required";
      }else if(password.length < 6){
        errors.password = "Min 6 characters required";
      }else if(password.length > 12){
        errors.password = "Max 12 characters allowed";
      }
  
      if(!confirmpassword){
        errors.confirmpassword = "Confirm Password required";
      }else if(confirmpassword !== password){
        errors.confirmpassword = "Confirm password didn't match password";
      }
  
      if(!mobile){
        errors.mobile = "Mobile number required"
      }else if(mobile.length !== 10){
        errors.mobile = "Mobile number is Invalid";
      }

      if(Object.keys(errors).length === 0){
        next();
      }
      else{
        return res.send({errors:errors});
      }
    }

  }
   

}