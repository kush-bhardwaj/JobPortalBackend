require('dotenv').config({});
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log('database connected')
},(fail)=>{
    console.log("failed to connect database");
})
