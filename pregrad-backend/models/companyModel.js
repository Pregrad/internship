const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const CONFIG = require("../utils/config/Schema");

const companySchema = new mongoose.Schema({
    name:{
      type:String,
      trim:true
    },
    designation:{
        type:String
    },
    email:{
        type:String
    },
    companyname:{
        type:String
    },
    phoneno:{
        type:Number
    },
    password:{
        type:String
    },
    verified: {
        type: Boolean,
        default: false
    },
    detailFlag:{
        type: Boolean,
        default: false
    },
    isAuthorized:{
        type: String,
        default: "Applied"
    }

})

companySchema.statics.login = async function(email,password){

    const company = await this.findOne({email})

    if(company){
        if(company.verified == true){
            const auth = await bcrypt.compare(password,company.password)
            if(auth){
                return company;
            }
        }else{
            return false
        }
    }
    else{
       return false
    }
}


module.exports = mongoose.model(CONFIG.COMPANY,companySchema);
