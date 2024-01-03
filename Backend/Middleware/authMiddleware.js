const JWT = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const JWT_SECRET = 'lsf936^%^kUSF$jksfdlf'

const requireSignin = (req,res,next)=>{
    
        try {
            const decode = JWT.verify(req.headers.authorization, JWT_SECRET);
            req.user = decode
            next();   
        } catch (error) {
            console.log(error);
        }
}

const isAdmin = async (req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.Role !== 1){
            return res.send({
                success:false,
                message:"Unauthorized User"
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {requireSignin, isAdmin}