const express = require('express')
const router = express.Router()

//index 
router.get("/", async (req, res) => {
    res.status(200).json({message: 'image index route'})
});

//create route 
router.post("/", async (req, res) => {
    res.status(201).json({message: 'image create route'})
});

module.exports = router
