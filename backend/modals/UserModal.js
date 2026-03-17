import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({

    username:{
       type: String,
       required:[true, "please provide username"],
       trim: true,
    },
    email:{
        type: String,
        required:[true,"please provide email"],
        trim:true,
        unique:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,,'Please provide a valid email address']
    },
    password:{
        type:String,
        trim:true,
        minLength:[6,"please provide password minimum length 6"],
         required:[true,'Please provide a password'],
    }

},{
    timestamps:true
});

userSchema.pre('save',async function(next){
if(!this.isModified('password')){
   return  next();
}
const salt =await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);

});

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User= mongoose.model("user",userSchema);
export default User;