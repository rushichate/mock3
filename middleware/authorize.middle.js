const authorize = () =>{
    return(req,res,next)=>{
        if(req.isAdmin==true){
            next()
        }else{
            res.send("not authorised")
        }
    }
}

module.exports = {
    authorize
}