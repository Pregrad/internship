
module.exports = {
    register(req,res,next){

        const {name,email,password,confirmpassword} = req.body;

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
    
        if(!confirmpassword){
          errors.confirmpassword = "Confirm Password required";
        }else if(confirmpassword !== password){
          errors.confirmpassword = "Confirm password didn't match password";
        }

        if(Object.keys(errors).length === 0){
            next();
          }
          else{
            return res.send({errors:errors});
          }
    }
}