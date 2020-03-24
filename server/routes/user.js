const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login
router.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({
            username,
            password
        });
        if(!user){
            throw new Error('Invalid Username or Password');
        } else {
            res.json({
                success:true,
                token:jwt.sign({username},process.env.JWT_SECRET)
            });
        }
    } catch(e) {
        console.log(e);
        res.json({
            success:false
        });
    }
});

// Check if authorized
router.post('/check_auth',async(req,res)=>{
    try {
        jwt.verify(req.body.token,process.env.JWT_SECRET)
        res.json({success:true});
    } catch(e) {
        res.json({success:false})
    }
});


// SIGNUP
router.post('/signup',async(req,res)=>{
    try{
        const {username,password} = req.body;
        const savedUser = await new User({
            username,
            password
        }).save();

        res.json({
            success:true,
            token:jwt.sign({username},process.env.JWT_SECRET)
        });
    } catch(e){
        console.log(e);
        res.json({
            success:false
        });
    }
});

module.exports = router;