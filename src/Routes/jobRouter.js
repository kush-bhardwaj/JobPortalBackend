const express = require('express');
const { createJob, getAllJobs, searchJob, jobDelete, updateJob } = require('../Controllers/jobsController');
const { authMiddleWare } = require('../Middlewares/authentication');
const { roleAuth } = require('../Middlewares/roleAuthorization');
const jobRouter = express.Router();

jobRouter.post('/create-job',authMiddleWare,roleAuth('recruiter'),createJob);
jobRouter.get('/getAllJob',authMiddleWare,roleAuth('recruiter',"user"),getAllJobs);
jobRouter.get('/search',searchJob);
jobRouter.delete('/deleteJob',authMiddleWare,roleAuth('recruiter'),jobDelete);
jobRouter.put('/update/:jobId',authMiddleWare,roleAuth('recruiter'),updateJob);
module.exports = jobRouter;