const userModel = require('../Models/userModel')
const {hashPassword, comparePassword} = require('../Helpers/authHelper')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const JWT_SECRET = 'lsf936^%^kUSF$jksfdlf';

const registerController = async (req,res)=>{
        try {
            const {Name,Email,Password,Phone,Address, Question} = req.body;

            if(!Name){
                return res.send({message:"Name is required"});
            }

            if(!Email){
                return res.send({message:"Email is required"});
            }
            if(!Password){
                return res.send({message:"Password is required"});
            }
            if(!Address){
                return res.send({message:"Address is required"});
            }
            if(!Phone){
                return res.send({message:"Phone is required"});
            }
            if(!Question){
                return res.send({message:"Phone is required"});
            }


            const existingUser = await userModel.findOne({Email});

            if(existingUser){
                return res.status(200).send({
                    success:false,
                    message:"Already registered user. Please login!!"
                })
            }

            const hashedPassword = await hashPassword(Password);
            
            const user = await new userModel({Name, Email, Password:hashedPassword, Phone, Address, Question}).save()
            res.status(201).send({
                success:true,
                user
            })


        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error in registration',
                error
            })
        }
}

const forgotPasswordController = async (req,res)=>{

    try {
        const {Email, Question, newPassword} = req.body;
            if(!Email){
                return res.send({message:"Email is required"});
            }
            if(!Question){
                return res.send({message:"Question is requird"});
            }
            if(!newPassword){
                return res.send({message:"New Password is required"});
            }


            const user = await userModel.findOne({Email, Question});
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"Incorrect Email or Answer"
                })
            } 

                    const newHash = await hashPassword(newPassword);
                    await userModel.findByIdAndUpdate(user._id, {Password:newHash})
                   
                        res.status(200).send({
                            success:true,
                            message:"Password successfully updated",
                        })
                    

                  
            }
     catch (error) {
        console.log(error)
         res.status(500).send({
         success:false,
        message:"Something went wrong in fPasswordController",
        error
    })
    }
}

const loginController = async (req,res)=>{
        try {
            const {Email, Password} = req.body;

            if(!Email || !Password){
                return res.status(404).send({
                    success:false,
                    message:"Invalid Email or Password",
                })
            }
            const user = await userModel.findOne({Email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"User is not registered",
                })
            }
            const match = await comparePassword(Password, user.Password)
            if(!match){
                return res.status(200).send({
                    success:false,
                    message:"Invalid Password",
                })
            }

            const token = JWT.sign({_id:user._id}, JWT_SECRET, {expiresIn: "7d"});
            res.status(200).send({
                success:true,
                message:"login Successfully",
                user:{
                    Name:user.Name,
                    Email:user.Email,
                    Password:user.Password,
                    Phone:user.Phone,
                    Address:user.Address,
                    Role:user.Role
                },
                token
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:"Error in login",
                error
            })
        }
}

const testController = (req,res)=>{
    try {
        res.send("Protected Route!!")
    } catch (error) {
        console.log(error)
    }
}

const updateProfileController = async (req, res) => {
    try {
      const { Name, Email, Password, Address, Phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (Password && Password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = Password ? await hashPassword(Password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          Name: Name || user.Name,
          Password: hashedPassword || user.Password,
          Phone: Phone || user.Phone,
          Address: Address || user.Address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


module.exports =  {registerController, loginController, testController,forgotPasswordController, updateProfileController} 