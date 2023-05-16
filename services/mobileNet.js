const mobilenet = require('@tensorflow-models/mobilenet');

let model; 
mobilenet.load().then(mobileNetModel => {
    model = mobileNetModel;
}).catch(err => console.error(err));

async function classifyImage(image){
    if (!model){
        throw new Error('Model is not loaded');
    }

    const predictions = await model.classify(image);
    return predictions;
}

module.exports = {
    classifyImage,
    model
}