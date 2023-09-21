const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")


const auth = async (req,res,next)=>{
    const token =  req.headers.authorization
    if(token){
        try{
            const decoded = jwt.verify(token,"masai")
            if(decoded){
                const {userID} = decoded
                const user = await UserModel.findOne({_id:userID})
                const admin = user.isAdmin
                req.isAdmin = admin
                req.id = userID
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }else{
        res.send({"msg":"Please Login"})
    }
}

module.exports = {
    auth
}