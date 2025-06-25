const jwt= require("jsonwebtoken")
const User = require("../models/user")

const protect= async (req,res,next) =>{
    const token= req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:" no token provided"})
    }
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        req.user= await User.findById(decoded.id).select('-password')
        next()
    }catch (err){
        console.error(err)
        res.status(401).json({message: "invalid token"})
    }
}
module.exports= protect