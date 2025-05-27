const userModel = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const { convertHashPassword, compareHasPassword } = require("../Utitlites/encryptPass");
const SentMail = require("../Utitlites/mails");
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        if (!name || !email || !password || !role || !phone) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const hashPass ={password: await convertHashPassword(password)}
        const payload = { name, email, password:hashPass.password, role, phone }
        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            const userRegister = await userModel.create(payload);
            if (userRegister) {
                const sentHTML =  `<html>
                    <body>
                    <h1>${name}</h1>
                    <p>Welcome ${name}</p>
                    <span>click on this link to verify <a href='http://192.168.111.11:8081/api/v1/user/verify/${userRegister._id}'>Verify Here</a></span>
                    </body>
                    </html>
                `
                SentMail(userRegister.email ,"Singup Success"," " ,sentHTML);
                res.status(200).json({
                    status: true, message: "regsiter successfull"
                })
            }
            else {
                res.status(200).json({ status: false, message: 'someting went wrong.' })
            }
        } else {
            res.status(200).json({ message: 'email already register' })
        }
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            for (const field in error.errors) {
                const errMsg = error.errors[field].message;
                res.status(400).json({ message: `❌ ${field} error: ${errMsg}` });
            }
        } else {
            res.status(400).json({ message: `❌ Other error: ${error.message}` });
        }
    }
}

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Invalid Details" });
        }
        const isUser = await userModel.findOne({ email });
        if (isUser) {
            
            if (await compareHasPassword(password,isUser.password)) {
                const payload ={
                    email:isUser.email,
                    name:isUser.name,
                    email:isUser.email,
                    phone:isUser.phone,
                    role:isUser.role,
                    id:isUser._id
                }
                const userToken = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'5d'});
                res.status(200).json({ status: true, token: userToken});
            }else{
                res.status(200).json({status:false,message:"Invalid Password"})
            }
        } else {
            return res.status(200).json({ status: false, message: "Invalid Email" })
        }
    }
    catch (error) {
       return  res.status(400).json({
            status: false,
            message: error
        })
    }
};


exports.verifyUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const  updateData = await userModel.updateOne({_id:id},{status:1});
        if(updateData){
            res.status(201).json({
                messaage:"Verify SuccessFull",
            });
        }else{
           res.staus(300).json({messahe:'Verify Faild'});
        }
    }catch(err){
        return res.status(400).json({message:"something went wrong to verify"});
    }
}