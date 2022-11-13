const Company = require('../models/companyModel')
const jwt  = require("jsonwebtoken")

module.exports.CheckCompany = async(req,res,next)=>{
   
    const token = req.cookies.jwt;
   
    if(req.type === "google")
    {
        if(req.token)
        {
            jwt.verify(req.token,"AnuragPandey",async(err,decodedToken)=>{   // header,payload,signature
                if(err){
                    res.json({
                            status:false
                        });
                    next();
                }else{
                    const user = await Company.findById(decodedToken.id)

                    if(user)
                    {
                        res.redirect(`http://localhost:3000/company/${user._id}`)
                    }
                } 
            })
          
        }else{
            res.json(
                {
                    status:false
                })
            next()
        }  
    }
    else if(token){
        jwt.verify(token,"AnuragPandey",async(err,decodedToken)=>{   // header,payload,signature
            if(err){
                
                res.json({
                        status:false
                    });
                next();
            }else{
                    const company = await Company.findById(decodedToken.id)
                  
                    if(company)
                    {  
                        res.json({
                            status:true,  
                            company:company.email,
                            id:decodedToken.id
                        })
                    
                    }
                else{
                    res.json(
                        {
                            status:false
                        })
                    next();

                }
            }
        })
    }else{

        res.json(
            {
                status:false
            })
        next()
    }
}