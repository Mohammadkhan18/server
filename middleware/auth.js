const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

exports.auth = async(req,res,next) =>{
    try{
      const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer","")
      if(!token){
        return res.status(401).json({
            success: false,
            message:"Token is missing"
        })
      }
      try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode)
    req.user = decode

      }catch(err){
      return res.status(401).json({
        success:false,
        message:'token is invalid'
      })
      }
      next();
    }catch(error){
    return res.status(401).json({
        success: false,
        message:"something went wrong while validating the token"
    })
    }
}


exports.isStudent = async(req,res,next) => {
    try{
   if(req.user.accountType !== "Student"){
    return res.status(401).json({
        success: false,
        message:"This is Protected Route For Students"
    })
   }
   next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Something went wrong while verifying the user role"
        })
    }
}

exports.isInstructor = async(req,res,next) => {
    try{
   if(req.user.accountType !== "Instructor"){
    return res.status(401).json({
        success: false,
        message:"This is Protected Route For Instructor"
    })
   }
   next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Something went wrong while verifying the user role"
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
   if(req.user.accountType !== "Admin"){
    return res.status(401).json({
        success: false,
        message:"This is Protected Route For Admin"
    })
   }
   next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Something went wrong while verifying the user role"
        })
    }
}