// import registerController from '../Controllers/authcontroller.js'
const {registerController, loginController, testController, forgotPasswordController, updateProfileController} = require('../Controllers/authcontroller');
const express = require('express');
const router = express.Router();
const {requireSignin, isAdmin} = require('../Middleware/authMiddleware');


router.post("/register", registerController)

router.post("/login", loginController)

router.post("/forgotPassword", forgotPasswordController)

router.get("/test", requireSignin, isAdmin, testController)



// private route user Dashboard
router.get('/userDashboard', requireSignin, (req,res)=>{
    res.status(201).send({
        ok:true
    })
})

// private route admin Dashboard
router.get('/adminDashboard', requireSignin, isAdmin, (req,res)=>{
    res.status(201).send({
        ok:true,
        message:"Successfully logged in by the admin"
    })
})


router.put("/profile", requireSignin, updateProfileController);


module.exports = router