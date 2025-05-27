exports.roleAuth = (...roles)=>{
   return (req,res,next)=>{
    if(!roles.includes(req.role)){
        console.log('role falioed')
        return res.status(400).json({message:`access denied to ${req.role}`});
    }
    else {
        next();
    }
   }
}