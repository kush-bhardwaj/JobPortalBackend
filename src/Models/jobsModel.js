const mongoose = require('mongoose');
const Collections = require('../DB/Collection');
const jobSchema = mongoose.Schema({
    jobTitle:{
        type:String,
        required:[true,'jobTitle requried']
    },
    description:{
        type:String,
        required:[true,'job description required']
    },
   jobType:{
    type:String,
    required:[true],
    enum:['full-time','part-time','internship','contract','remote']
   },
   category:{
    trype:String
   },
   companyName:{
    type:String,
    required:[true,'company name missing']
   },
   location:{
    type:String,
    required:true
   },
   salaryMin:{type:Number},
   salaryMax:{type:Number},
   currency:{type:String,enum:['INR','USD']},
   benefits:{type:[String],default:[]},
   experience:{
    type:String || Number ,
    requireed:true
   },
   education:{
    type:String
   },
   postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
   }
   ,
   createdAt:{
    type:Date,
    default:Date.now
   }
})
const jobModel = new mongoose.model(Collections.jobs,jobSchema);
module.exports = jobModel;