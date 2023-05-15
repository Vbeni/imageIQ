const express = require('express')
const Image = require("../models/Image")
const router = express.Router()

//index 
router.get("/", async (req, res) => {
    try {
        res.json(await Image.find({}));
    }catch(error){
        res.status(400).json(error);
    }
});

//create route 
router.post("/", async (req, res) => {
   try{
    res.json(await Image.create(req.body));
   }catch (error){
    res.status(400).json(error);
   }
});

router.get("/:id", async (req, res) => {
    try{
        res.json(await Image.findById)(req.params.id)
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:id", async (req, res) =>{
    try{
        res.json(
            await Image.findByIdAndUpdate(req.params.id, req.body, { new: true})
        );
    }catch(error){
        res.status(400).json(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        res.json(
            await Image.findByIdAndRemove(req.params.id));
    }catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router
