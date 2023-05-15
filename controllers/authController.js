const express = require("express");
const User = require("../models/User");
const router = express.Router();
//for user auth 

//sign uo route 
router.post("/register", async (req, res, next) =>{
    //try block for error handling 
    try{
        //gen salt value using bcrypt
        const salt = await bcrypt.genSalt(10);
        //hashes password using salt 
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        //updates password to the value returned in previous line
        req.body.password = passwordHash;
        //creates new user in database
        const newUser = await User.create(req.body);
        
        res.status(201).json({
            currentUser: newUser,
            isLoggedIn: true,
        });
    } catch (err) {
        res.status(400).json({ err: err.message});
    }
});

//sign in route
router.post("/login", async (req, res, next) =>{})

module.exports = router;