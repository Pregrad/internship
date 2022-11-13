const mongoose = require("mongoose");
const CONFIG = require("../utils/config/Schema");

const achievementSchema = new mongoose.Schema({
    title:{
       type:String
    },
    certificate:{
        type:String
    }
})

const projectSchema = new mongoose.Schema({
    projecttitle:{
       type:String
    },
    description:{
        type:String
    },
    skills:{
        type:Array,
        default:[]
    },
    projectlink:{
        type:String
    }
})

const workSchema = new mongoose.Schema({
    companyname:{
       type:String
    },
    position:{
        type:String
    },
    role:{
        type:String
     
    },
    duration:{
        type:String
    },
    websitelink:{
        type:String
    },
    skills:{
        type:Array,
        default:[]
    }
})

const educationSchema = new mongoose.Schema({
    university:{
        type:String
     },
     field:{
         type:String
     },
     degree:{
         type:String
     },
     start:{
         type:String
     },
     end:{
         type:String
     }
})

const UserInfoSchema = new mongoose.Schema({
    id:{
      type:String
    },
    achievements:[
            achievementSchema
        ],
    project:[
            projectSchema
    ],
    workexperience:[
            workSchema
    ],
    education:[
        educationSchema
    ],
    profilescore: {
        type: Number,
        default: 20
    },
   skills:{
    type:Array,
    default:[]
   },
   domain:{
    type:Array,
    default:[]
   },
   socialLinks:{
    type:Object,
    default:{}
   },
   location:{
    type:String
   },
   video:{
    type:String,
    trim: true,
    default:""
   },
   applied:{
    type:Array,
    default:[]
   },
   reports:{
    type:Array,
    default:[]
   }
})
   

module.exports = mongoose.model(CONFIG.STUDENTINFO,UserInfoSchema)
