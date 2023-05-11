require("dotenv").config();
const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

//Connect to Database
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//Connections console logs
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error));

module.exports = mongoose; 

