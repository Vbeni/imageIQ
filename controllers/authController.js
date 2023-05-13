const express = require("express");
const User = require("../models/User");
//for user auth 
const bcrypt = require("bcrypt");

const router = express.Router();

//sign uo route 
router.post("/register", async (req, res, next) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        req.body.password = passwordHash;

        const newUser = await User.create(req.body);
        
        res.status(201).json({
            currentUser: newUser,
            isLoggedIn: true,
        });
    } catch (err) {
        res.status(400).json({ err: err.message});
    }
});

//sogn in route
router.post("/login", async (req, res, next) =>{})

module.exports = router;