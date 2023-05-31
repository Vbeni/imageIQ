const mongoose = require('./connection');
const bcrypt = require('bcrypt');

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    Image: {
        type: String,
        required: true,
    },
    Predictions: [
        {
            className: {
                type: String, 
                required: false
            },
            probability: {
                type: Number,
                required: false
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