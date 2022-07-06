import express from "express";
// const express = require("express");
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


mongoose.connect("mongodb+srv://telecom110:eGJkkgLXlSfOuX74@telecom0.8cjsp.mongodb.net/tunisieTelecom?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=> console.log("Connected to DB !!") );


//user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/Login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password === user.password){
                res.send({message:"login sucess",user:user})
                console.log("logged in ")
            }else{
                res.send({message:"wrong credentials"})
            }
        }else{
            res.send("not register")
        }
    })
});
app.post("/Register",(req,res)=>{
    console.log(req.body)
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"successful"})
                }
            })
        }
    })


})

app.listen(3001,()=>{
    console.log("started")
})