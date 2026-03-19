import jwt from "jsonwebtoken";
import User from "../modals/UserModal.js";

const protect = async(req, res, next)=>{

let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

    try{ 
        token=req.headers.authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user= await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(400).json({
                statusCode:400,
                message:"User not found",
                success:false
            })
        }
        req.user=user;

        next();
    }catch(err){
       if(err.name === 'TokenExpiredError'){
              return res.status(401).json({
                    error:"Token expired",
                    statusCode:401,
                    success:false
        });
    }
           return res.status(401).json({
            error:"Not authorized, invalid token",
            statusCode:401,
            success:false 

        });
    }
}

if(!token){
    return res.status(400).json({
        statusCode:400,
        success: false,
        message:"not Authorised"
    });
}

}

export default protect;