const jobModel = require("../Models/jobsModel");

exports.createJob = async (req, res) => {
   
    try{
         const { jobTitle, description, jobType,
        category, companyName, location,
        salaryMin, salaryMax, currency, benefits,
        experience, education, postedBy
    } = req.body;

    if (!jobTitle || !description || !jobType
        || !category || !companyName || !location ||
        !salaryMin || !salaryMax || !currency || !benefits
        || !experience || !education || !postedBy) {
        return res.status(401).json({ message: "all fields are required" })
    };

    const jobinsert = await jobModel.create({jobTitle,description,jobType,category,companyName,location,salaryMin,salaryMax,currency,benefits,experience,education,postedBy});
    if(jobinsert){
        return res.status(201).json({status:true,message:"job created"})
    }else{
        return res.status(200).json({status:false,message:"unable to create job"});
    }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            message:err
        })
    }

};  