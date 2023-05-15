const express = require("express");
const User = require("../models/User");
const router = express.Router();
//for user auth 
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {Strategy, ExctractJwt, ExtractJwt } = require('passport-jwt');
const secret = process.env.JWT_SECRET;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const verify = async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id)
        return done(null, user)
    }catch(err){
        return done(err)
    }
}

const strategy = new Strategy(opts,verify)
passport.initialize()

const requireToken = passport.authenticate('jwt', {session: false})

const createUserToken  = (req, user) => {
    if(
        !user ||
        !req.body.password ||
        !bcrypt.compareSync(req.body.password, user.password)
    ){
        const error = new Error("The provided username or password is incorrect")
        error.statusCode = 422
        throw error
    }

    return jwt.sign({id: user._id},secret,{expiresIn: 36000 })
}

module.exports = {
    requireToken,
    createUserToken
}

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