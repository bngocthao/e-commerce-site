const express = require('express')
const router = express.Router()
const Product = require('../models/user')


// adding product to user shopping cart
const {MongoClient} = require("mongodb");
router.post("/:userId/cart", async (req, res) => {
    // lấy user id trên thanh url, product id ở body
    const { userId } = req.params;
    const { productId } = req.body;
    // connect to database
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("wdbs");
    // tìm user và đẩy product id vào giỏ hàng user
    await db.collection("users").updateOne(
        { id: userId },
        {
            $addToSet: { cartItems: productId },
        }
    );
    const user = await db.collection("users").findOne({ id: userId });
    const products = await db.collection("products").find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map((id) =>
        products.find((product) => product.id === id)
    );
    if (cartItems) {
        res.status(200).json(cartItems);
    } else {
        res.status(404).json("Could not find the product!");
    }
    client.close();
});

// delete product from user shopping cart
router.delete("/:userId/cart/:productId", async (req, res) => {
    // connect to database
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("wdb");

    const { userId, productId } = req.params;
    //update
    const cartItems = await db.collection("users").updateOne(
        { id: userId },
        {
            $pull: { cartItems: productId },
        }
    );
    const user = await db.collection("users").findOne({ id: userId });
    const products = await db.collection("products").find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItemsAfter = cartItemIds.map((id) =>
        products.find((product) => product.id === id)
    );
    //sent back update data to client
    res.status(200).json(cartItemsAfter);
    client.close();
});

// getting data for user shopping cart
router.get("/:userId/cart", async (req, res) => {
    // connect to database
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("wdbs");

    //query get products in user cart
    // return user obj
    const { userId } = req.params;
    const user = await db.collection("users").findOne({ id: userId });
    if (!user) return res.status(404).json("Could not find user");
    // Trường hợp user exist thì lấy products trả về cho user
    else {
        const products = await db.collection("products").find({}).toArray();
        //point to user obj to get productid inside cartItems and map it with cartItems to get user shopping cart product obj
        const cartItemIds = user.cartItems;
        const cartItems = cartItemIds.map((id) =>
            products.find((product) => product.id === id)
        );
        res.status(200).json(cartItems);
    }
    client.close();
});

// this is call export a module
module.exports = router