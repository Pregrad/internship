const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    image_link:{
        type:String,
        trim:true
    },
    name:{
      type:String,
      trim:true
    },
    college_name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    }
})

const eventsSchema = new mongoose.Schema({
    imagelink:{
        type:String,
        trim:true
    },
    name:{
      type:String,
      trim:true
    },
    speaker:{
        type:String,
        trim:true
    },
    organisation:{
        type:String,
        trim:true
    },
    date:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
  eventlink:{
    type:String,
    trim:true
}
})


const courseSchema = new mongoose.Schema({
    courselink:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    instructordetail:{
        type:String,
        trim:true
    },
    instructor:{
        type:String,
        trim:true
    },
    rating:{
        type:Number
    },
    fee:{
        type:Number
    },
    enrolled:{
        type:Number
    },
    imagelink:{
        type:String,
        trim:true
    }
})

const appSchema = new mongoose.Schema({
    id:{
        type:String
    },
    events:[
        eventsSchema
    ],
    testimonials:[
        testimonialSchema
    ],
    cources:[
        courseSchema
    ]
})

const appModel = mongoose.model("App",appSchema);

module.exports = appModel;