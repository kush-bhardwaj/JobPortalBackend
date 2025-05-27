const bcrypt = require('bcryptjs');
exports.convertHashPassword = async(pass)=>{
    const salt = await bcrypt.genSaltSync(15);
    return  await bcrypt.hashSync(pass,salt);
};
exports.compareHasPassword =async(oldPass , hashPass)=>{
    return await  bcrypt.compareSync(oldPass ,hashPass)
}