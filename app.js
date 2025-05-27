const express = require('express');
const cors = require('cors');
const userRouter = require('./src/Routes/userRouter');
const jobRouter = require('./src/Routes/jobRouter');
const  app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
module.exports = app;