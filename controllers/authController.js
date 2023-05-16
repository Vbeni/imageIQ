const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { createUserToken } = require("../middleware/auth");
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

        if(newUser) {
            req.body.password = pwStore;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                currentUser: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
        });
        }else{
            res.status(400).json({error: "Something went wrong"})
        }
    } catch (err) {
        res.status(400).json({ err: err.message});
    }
});

//sign in route
router.post("/login", async (req, res, next) =>{
    try{
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);
        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token,
        });
    }catch(err){
        res.status(401).json({ error: err.message });
    }
});

router.get( "/logout", requireToken, async (req, res, next) => {
    try{
        const currentUser = req.user.username
        delete req.user
        res.status(200).json({
            message: `${currentUser} currently logged out`,
            isLoggedIn: false,
            token: "",
        });
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports = router;