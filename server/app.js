const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//DB Connection
mongoose
  .connect('mongodb://localhost/auth' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the database successfully"))
  .catch(err => console.log(err));



const authRoutes = require("./routes/user");
app.use("/api/auth", authRoutes);

app.get('/',(req,res)=>{
    res.send('Hello');
});

app.listen(5000, () => {
  console.log(`Port started at 5000`);
});