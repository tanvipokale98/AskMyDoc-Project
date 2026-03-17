import mongoose from "mongoose";

// connect mongo db
const connectDB = async ()=>{
    try{
    const db=await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
}catch(err){
    console.error("DB connection error"+err);
    process.exit(1);
}
}

export default connectDB;