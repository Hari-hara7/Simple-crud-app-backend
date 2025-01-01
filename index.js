const express = require("express");
const Product = require("./models/product.model.js"); 
const mongoose = require("mongoose");
const productRoute= require("./routes/product.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/api/products", productRoute);


app.get("/", (req, res) => {
  res.send("Hello from Node API - Updated Version 1");
});


mongoose
  .connect(
    "mongodb+srv://Harihara2277:Hari2277@cluster0.c79zl.mongodb.net/Haridb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");


    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error.message);
  });
