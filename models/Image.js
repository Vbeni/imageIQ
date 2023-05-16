const mongoose = require('./connection');
const bcrypt = require('bcrypt');

const ImageSchema = new mongoose.Schema({
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    Predictions: [
        {
            className: {
                type: String, 
                required: true
            },
            probability: {
                type: Number,
                required: true
            }
        }
    ]
},
{
    timestamps: true,
    }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;