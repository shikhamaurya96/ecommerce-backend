//import dbConnect from "../db/dbConfig .js";
//const { ObjectId } = require("mongodb");
const userModel = require("../db/user.model")
const Jwt = require("jsonwebtoken");

//signin controller
exports.signUpController = async(req,res)=>{
    const{username,email,mobile,address,password} = req.body;
    try{
        //check if the user already exist
        let user =await userModel.findOne({email:email});
        if(user){
          return res.status(400).send({result:"email already exist"})
        }
       //create user
       const newUserInstance = new userModel(req.body);
       const result = await newUserInstance.save();
       if(result){
        Jwt.sign({id:result._id},process.env.JWTkey,(err,token)=>{
            if(err){
                return res.status(403).send({result:err.message})
            }
            return res.status(200).send({result,auth:token})
        })
       }
        
    }
    catch(err){
     return res.status(500).send({result:err.message})
    }
    
}

//login controller
exports.loginController = async(req,res)=>{
    const{email,password} = req.body;
    let user = await userModel.findOne({email:email, password:password}).select("-password");
    if(user){
     Jwt.sign({id:user._id},process.env.JWTkey,(err,token)=>{
        if(err){
          return res.status(403).send({result:err.message})
        }
       return res.status(200).send({user,auth:token})
     })
       
    }
    else{
        return res.status(400).send({result:"user not found"})
    }
}

//account controller

exports.accountController = async(req,res)=>{
    try{
        console.log("req", req.userId);
        let  result = await userModel.findOne({_id:req.userId})
        console.log("result",result)
        return res.status(200).send(result)
    }catch(err){
        console.log("err1",err)
        return res.status(500).send({result:err})
    }
    
}