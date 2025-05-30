const { default: mongoose } = require("mongoose");
const jobModel = require("../Models/jobsModel");
const userModel = require("../Models/userModel");

exports.createJob = async (req, res) => {

    try {
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

        const jobinsert = await jobModel.create({ jobTitle, description, jobType, category, companyName, location, salaryMin, salaryMax, currency, benefits, experience, education, postedBy });
        if (jobinsert) {
            return res.status(201).json({ status: true, message: "job created" })
        } else {
            return res.status(200).json({ status: false, message: "unable to create job" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: err
        })
    }

};

// get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const allJobs = await jobModel.find();
        if (allJobs) {
            return res.status(200).json({ data: allJobs })
        } else {
            return res.status(400), json({ message: "sonething went wrong" })
        }
    } catch (err) {
        return res.status(500).josn({ error: err })
    }
}

// job search
exports.searchJob = async (req, res) => {
    try {
        const { search } = req.query;
        const query = {
            $or: [
                { companyName: { $regex: `^${search}`, $options: "i" } },
                { jobTitle: { $regex: `^${search}`, $options: "i" } }
            ]
        }
        const response = await jobModel.find(query);
        if (response) {
            return res.status(201).json({ data: response, status: true })
        } else {
            return res.status(400).josn({ message: "not found", status: false })
        }
    } catch (err) {
        return res.status(500).json({ mesage: "something went wrong" })
    }
}


//delete job 
exports.jobDelete = async (req, res) => {
    try {
        const { user_id } = req;
        const { jobId } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "Invalid User" });
        }
        if (jobId !== mongoose.Types.ObjectId.isValid()) {
            return res.status(400).json({ message: "Invalid Job" });
        }
        const isUser = await userModel.findById({ _id: user_id });
        if (!isUser) {
            return res.status(400).json({ message: "Invalid User !!" })
        }
        const delete_job = await jobModel.deleteOne({ _id: jobId });
        if (delete_job.deletedCount === 0) {
            return res.status(404).json({ message: "Job not found or already deleted" });
        }
        return res.status(201).json({
            message: "job Deleted successFull"
        })
    } catch (err) {
        return res.status(500).json({ message: "something went wrong", error: err })
    }
}

//update job 
exports.updateJob = async (req, res) => {
    try {
        const { user_id } = req;
        const { jobId } = req.params;
        const updateJobDetails = {
            jobTitle, description, jobType,
            category, companyName, location,
            salaryMin, salaryMax, currency,
            benefits, experience, education,
            postedBy
        } = req.body;

        if (!jobTitle || !description || !jobType ||
            !category || !companyName || !salaryMin || !salaryMax || !currency ||
            !benefits || !experience || !education ||
            !postedBy || !location) {

            return res.status(400).json({ message: "Invalid Details" })
        }

        if (!user_id) {
            return res.status(400).json({ message: "user missing" });
        }
        if (!jobId) {
            return res.status(400).json({ message: "Invalid Job" });
        }
        const isUser = await userModel.findById({ _id: user_id });
        if (!isUser) {
            return res.status(400).json({ message: 'Invalid User' });
        }

        const isJob = await jobModel.findOne({ _id: jobId });
        if (!isJob) { return res.status(400).json({ message: "Job Not Found" }) }

        const update = await jobModel.updateOne({ _id: jobId }, updateJobDetails);
        if (update.deletedCount === 0) {
            return res.status(400).json({ message: "failed to remove job" });
        }
        return res.status(201).json({
            message: "Job Updated"
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            error: err
        })
    }
}

//get single job 
exports.getSingleJob = async (req, res, next) => {
    try {
        const { user_id } = req;
        const { jobId } = req.params;
        if (!user_id || !jobId) {
            return res.status(400).json({ message: "Invalid user and job" });
        }
        const isUser = await userModel.findById({ _id: user_id });
        if (!isUser) {
            return res.status(400).json({ message: 'Invalid User' });
        }
        const isJob = await jobModel.findById({ _id: jobId });
        if (!isJob) { return res.status(400).json({ message: "Job Not Found" }) }

        return res.status(200).json({ status: success });
    } catch (err) {
        return res.status(500).json({ status: false, message: "something went wrong" });
    }

}