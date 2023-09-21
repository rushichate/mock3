const express = require("express")
const { auth } = require("../middleware/auth.middle")
const { authorize } = require("../middleware/authorize.middle")
const { OrderModel } = require("../model/order.model")

const orderRouter = express.Router()

orderRouter.post("/",auth,async(req,res)=>{
//    const userID = req.userID
//    const bookID = req.bookID
//    try{
//     const order = 
//    }
})

orderRouter.get("/",auth,authorize,async(req,res)=>{
    try{
        const orders = await OrderModel.find()
        res.status(200).send(orders)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = {
    orderRouter
}