const mongoose = require("mongoose");
const CONFIG = require("../utils/config/Schema");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default:"admin"
    },
    verified:{
        type:Boolean,
        default:false
    },
    Company_Verification:{
        type:Array,
        default:[]
    },
    reports:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


adminSchema.statics.login = async function(email,password){

    const admin = await this.findOne({email})

    if(admin){
        if(admin.verified == true){
            const auth = await bcrypt.compare(password,admin.password)
            if(auth){
                return admin;
            }
        }else{
            return false
        }
    }
    else{
       return false
    }
}


const admin = mongoose.model(CONFIG.ADMIN,adminSchema);

module.exports = admin;