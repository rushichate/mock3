const express = require("express")
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");


const userRouter = express.Router();

userRouter.get("/register",async(req,res)=>{
    const {name,email,password,isAdmin} = req.body
    try{
        const user = new UserModel({name,email,password,isAdmin})
        await user.save();
        res.status(201).send("user registered")
    }catch(err){
    res.status(400).send(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await UserModel.findOne({email})
        if(user){
            if(user.password == password){
                const token = jwt.sign({userId:user._id,admin:user.isAdmin},"masai")
                res.status(201).send("login success")
            }else{
                res.status(201).send("wrong credentials")
            }
        }else{
            res.status(201).send("Please register first")
        }
    }catch(err){
        res.status(400).send(err)
    }
})


module.exports = {
    userRouter
}