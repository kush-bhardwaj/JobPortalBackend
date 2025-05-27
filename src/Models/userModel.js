const mongoose = require('mongoose')
const Collections = require('../DB/Collection')
const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'please enter valid email adddress']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        validate: {
            validator: (val) => {
                if (val.length < 8) return false;
                if (!/[a-z]/.test(val)) return false;
                if (!/[A-Z]/.test(val)) return false;
                if (!/[0-9]/.test(val)) return false;
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return false;
                if (/\s/.test(val)) return false;

                 return true;
            },
             message: props => 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character with no spaces.'
        }
    },
    role: { type: String, required: [true, "role is required"] },
    phone: { type: String, required: [true, 'phone number is required'] },
    status:{type:Boolean,default:0}
    // savedJobs:{type:mongoose.Schema.Types.ObjectId,default:[],ref:"job"}
});
const userModel = new mongoose.model(Collections.user, userSchema);
module.exports = userModel;