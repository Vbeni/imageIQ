const express = require('express')
const Image = require("../models/Image")
const router = express.Router()
const { handleValidateOwnership, requireToken } = require("../middleware/auth")

//index 
const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.get("/", async (req, res) => {
    try {
        res.json(await Image.find({}));
    }catch(error){
        res.status(400).json(error);
    }
});

//create route 
router.post("/", requireToken, async (req, res) => {
    try {
      const owner = req.user._id;
      req.body.owner = owner;
  
      // Get the image data from the request body
      const imageBuffer = Buffer.from(req.body.image, 'base64');
      const tfimage = tf.node.decodeImage(imageBuffer);
  
      // Load the MobileNet model and classify the image
      const model = await mobilenet.load();
      const predictions = await model.classify(tfimage);
      req.body.Predictions = predictions;
  
      const newImage = await Image.create(req.body);
  
      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  });
  

router.get("/:id", async (req, res) => {
    try{
        const foundImage = await Image.findById(req.params.id)
        .populate("owner")
        .exec();
        res.status(200).json(foundImage);
    }catch(error){
        res.status(400).json({error: error.message });
    }
})

router.put("/:id", async (req, res) =>{
    try{
       handleValidateOwnership(req, await Image.findById(req.params.id))
       const updatedImage = await Image.findByIdAndUpdate(
       req.params.id,
       req.body,
        { new: true }
      )
       res.status(200).json(updatedImage)
    }catch(error){
       res.status(400).json({error: error.message});
    }
});
router.delete("/:id", async (req, res) => {
    try {
        handleValidateOwnership(req, await Image.findById(req.params.id));
        const deletedImage = await Image.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedImage);   
    }catch(error) {
        res.status(400).json({error: error.message});
    }
});
module.exports = router
