const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

let model; 

async function loadModel() {
    console.log("Current backend before setting:", tf.getBackend());
    
    // Set the backend to 'cpu'
    await tf.setBackend('cpu');
    
    console.log("Current backend after setting:", tf.getBackend());

    // Now load the model
    model = await mobilenet.load();

    console.log("Model loaded successfully");
}

loadModel().catch(err => console.error(err));

async function classifyImage(image) {
    if (!model) {
        throw new Error('Model is not loaded');
    }

    const predictions = await model.classify(image);
    return predictions;
}

module.exports = {
    classifyImage,
    model
};
