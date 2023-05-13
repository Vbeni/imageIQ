const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        res.json(await User.find({}));
    } catch (error){
        res.status(400).json(error);
    }
});
//user edit route 
router.put("/:id", async (req, res) =>{
    try{
        res.json(
            await User.findByIdAndUpdate(req.params.id, req.body, { new: true})
        );
    }catch(error){
        res.status(400).json(error);
    }
});
module.exports = router;