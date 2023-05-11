//env variable
require("dotenv").config();
//port from env
const { PORT } = process.env;
//import express
const express = require("express");
//create app object
const app = express();
const userRouter = require("./controllers/userController");

//import middleware
const cors = require('cors');
const morgan = require('morgan');


//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRouter)

//test route
app.get('/', (req, res) =>{
    res.send("hello world");
});
//listener
app.listen(PORT, () => console.log(`Forever listening to the one the only PORT ${PORT}`));