const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');


async function loadAndClassifyImage(imagePath) {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    const tfimage = tf.node.decodeImage(imageBuffer);
  
    // Load mobilenet model
    const model = await mobilenet.load();

    // Classify the image
    const predictions = await model.classify(tfimage);
  
    console.log('Predictions:', predictions);
}


loadAndClassifyImage('dog.jpeg');
