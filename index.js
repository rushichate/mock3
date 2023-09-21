const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const { bookRouter } = require("./route/book.route");
require("dotenv").config()


const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Welcome to masai library")
})
app.use("/users",userRouter)
app.use("/books",bookRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected to db")
        console.log(`running on ${process.env.port}`)
    }catch(err){
        console.log("not able to connect")
        res.status(400).send(err)
    }
})