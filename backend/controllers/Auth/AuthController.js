import User from '../../modals/UserModal.js'
import jwt from 'jsonwebtoken';

export const Register = async (req,res,next) =>{
     try{

     const {username, email, password} = req.body;
    

    //  check if user already exists
    const userExists= await User.findOne({email});
    // if exists return error
    if(userExists){
        return res.status(401).json({
            success:false,
            message:"user already exists",
            statusCode:401
        });
    }
   
    // if does not exists create user
    const user = await User.create({
        username,
        email,
        password
    });

    // create jwt token
   const token = jwt.sign({id:user._id, email:email},process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRE || '7d'})

//    send response 
       return res.status(200).json({
            success:true,
            statusCode:200,
            message:"User register successfully",
            data:{
                user:{
                     id:user._id,
                username:username,
                email:email,
                token:token,
                }
            }
        })
     }catch(err){
        next(err);
     }
}

export const Login = async (req,res,next)=>{
try{
    const {email, password}=req.body;

// if email or password does not exists return error
 if(!email || !password){
     return res.status(401).json({
        statusCode:401,
        success:false,
        message:"Please provide all fields"
    })
 }

//  check if user is registered or not
const user = await User.findOne({email}).select('+password');

// if user doesnt exists return error
if(!user){
    return res.status(401).json({
        statusCode:401,
        success:false,
        message:"User Not found"
    })
}

// check user entered password is correct
const isMatched = await user.matchPassword(password);

// if not return error
if(!isMatched){
    return res.status(401).json({
        statusCode:401,
        success:false,
        message:"Password or Email is incorrect"
    })
}


// generate token
const token =  jwt.sign({id:user._id, email:email},process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRE || '7d'});

// return successfull login message
return res.status(200).json({
    statusCode:200,
    success:true,
    message:"User logged in Successfully",
    data:{
        user:{
            id:user._id,
            username: user.username,
            email:email,
        }
    },
token
});

}catch(err){
    next(err);
}


}

export const getProfile = async (req, res, next) => {
  try {
    const id = req.user.id                         

    const result = await User.findById(id).select('-password')

    if (!result) {
      return res.status(404).json({
        statusCode: 404, success: false, message: "User not found"
      })
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User data fetched successfully",
      data: {
        id: result._id,
        username: result.username,
        email: result.email,
        createdAt: result.createdAt
      }
    })
  } catch (err) {
    next(err)
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const id = req.user._id                        
    const { password } = req.body

    if (!password || password.trim() === '') {      
      return res.status(400).json({
        statusCode: 400, success: false, message: "Please provide a password"
      })
    }

    
    const user = await User.findById(id)
    user.password = password
    await user.save()                               

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Password reset successfully"
    })
  } catch (err) {
    next(err)
  }
}