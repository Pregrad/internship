const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CONFIG = require("../utils/config/Schema");


const userRegisterSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
   detailFlag:{
    type:Boolean,
    default:false
   }
});

userRegisterSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userRegisterSchema.statics.login = async function(email,password){

    const user = await this.findOne({email})

    if(user){
        if(user.verified == true){
            const auth = await bcrypt.compare(password,user.password)
            if(auth){
                return user;
            }
        }else{
            return false
        }
    }
    else{
       return false
    }
}

const UserRegister =  mongoose.model(CONFIG.USERREGISTER, userRegisterSchema);

module.exports = UserRegister;


