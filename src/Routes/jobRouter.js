const express = require('express');
const { createJob } = require('../Controllers/jobsController');
const jobRouter = express.Router();

jobRouter.post('/create-job',createJob);
module.exports = jobRouter;