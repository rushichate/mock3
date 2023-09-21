const express = require("express")
const { BookModel } = require("../model/book.model")
const { auth } = require("../middleware/auth.middle")
const { authorize } = require("../middleware/authorize.middle")

const bookRouter = express.Router()

bookRouter.get("/",auth,async(req,res)=>{
    const cat = req.query;
    try{
        const books = await BookModel.find({category:cat})
        res.status(200).send(books)
    }catch(err){
        res.status(400).send(err);
    }
})

bookRouter.get("/:id",auth,async(req,res)=>{
    const id = req.params;
    try{
        const book = await BookModel.fidnOne({_id:id})
        res.status(200).send(book)
    }
    catch(err){
        res.status(400).send(err);
    }
})

bookRouter.post("/",auth,authorize, async(req,res)=>{
    const {title,author,category,price,quantity} = req.body
   try{
      const book = new BookModel({title,author,category,price,quantity})
      await book.save()
      res.status(201).send("book added")
   }catch(err){
    res.status(400).send(err)
   }
})

bookRouter.patch("/:id",auth,authorize,async(req,res)=>{
    const id = req.params;
    const data = req.body;
    try{
        await BookModel.findByIdAndUpdate(id,data);
        res.status(204).send("book updated")
    }catch(err){
        res.status(400).send(err)
    }
})

bookRouter.delete("/:id",auth,authorize,async(req,res)=>{
    const id = req.params;
    try{
        await BookModel.findByIdAndDelete(id)
        res.status(202).send("book deleted")
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = {
    bookRouter
}

