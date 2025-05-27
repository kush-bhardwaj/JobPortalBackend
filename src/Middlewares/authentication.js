const jwt = require('jsonwebtoken');
exports.authMiddleWare =async(req,res,next)=>{
    try{
        const userToken = req.headers['authorization'].split(" ")[1];
    const userInfo = jwt.verify(userToken,process.env.SECRET_KEY)
    if(userInfo){
        console.log("auth")
        req.user_id = userInfo.id;
        req.role = userInfo.role;
        next()
    }else{
        return res.status(400).json({message:"Unauthrized user !!"});
    }
    }
    catch(error){
        return res.status(400).json({mesage:"you are unauthrized please try again !!",error});
    }
}