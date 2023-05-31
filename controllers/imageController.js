const express = require('express');
const Image = require('../models/Image');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { imageUrl, userid } = req.body;
   
    // Find the user by ID
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new image document and associate it with the user
    const newImage = await Image.create({
      user: user._id,
      Image: imageUrl,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const foundImage = await Image.findById(req.params.id)
      .populate('user')
      .exec();
    res.status(200).json(foundImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
