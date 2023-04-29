const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// adding product
router.post("/", (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    });

    // sau khi lưu thì trả về promise
    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

// get products list
router.get("/", async (req, res) => {
    // connect to database
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("wdbs");

    //query get products
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);

    //close db?
    client.close();
});


// getting endpoint for product detail
router.get("/:productId", async (req, res) => {
    // connect to database
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("wdbs");

    const { productId } = req.params;
    const product = await db
        .collection("products")
        .find({ id: productId })
        .toArray();
    if (product) {
        res.status(200).json(product);
    } else res.status(404).json("Could not find the product!");

    client.close();
});

// this is call export a module
module.exports = router