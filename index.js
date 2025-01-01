const express = require("express");

const Product = require("./models/product.model.js"); 
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from Node API - Updated Version 1");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.meessage });
  }
});

//delete product

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

   const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST Route to Create a New Product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body); // Use the correct model
    res.status(201).json(newProduct); // Return the created product
  } catch (error) {
    res.status(500).json({ message: error.message }); // Use correct status code
  }
});

// Database Connection
mongoose
  .connect(
    "mongodb+srv://Harihara2277:Hari2277@cluster0.c79zl.mongodb.net/Haridb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");

    // Start the server
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Connection failed:", error.message);
  });
