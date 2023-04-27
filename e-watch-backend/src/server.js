import express from 'express'
import bodyParser from 'body-parser'
const mongoose = require('mongoose')
const app = express()
app.use(bodyParser.json())
import path from 'path'
// use mongodb connection
import {ServerApiVersion} from "mongodb";
import { MongoClient } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://b1812378:fR2Lydbw@cluster0.ofhpjzs.mongodb.net/?retryWrites=true&w=majority";

//dùng để load ảnh
app.use('/images', express.static(path.join(__dirname, '../assets')))

app.get('/api/products', async (req, res) => {
    // connect to database
    const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/',
    {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    //query get products
    const products = await db.collection('products').find({}).toArray()
    res.status(200).json(products)

    //close db?
    client.close()
})

// adding product to user shopping cart
app.post('/api/users/:userId/cart', async (req, res) => {
    // lấy user id trên thanh url, product id ở body
    const { userId } = req.params
    const { productId } = req.body
    // connect to database
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017/',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')
    // tìm user và đẩy product id vào giỏ hàng user
    await db.collection('users').updateOne({id: userId}, {
        $addToSet: {cartItems: productId}
    })
    const user = await db.collection('users').findOne({id: userId})
    const products = await db.collection('products').find({}).toArray()
    const cartItemIds = user.cartItems
    const cartItems = cartItemIds.map( id => products.find(product => product.id === id))
    if(cartItems) {
        res.status(200).json(cartItems)
    }else{
        res.status(404).json("Could not find the product!")
    }
    client.close()
})

// delete product from user shopping cart
app.delete('/api/users/:userId/cart/:productId', async(req, res) => {
    // connect to database
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017/',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    const { userId, productId } = req.params;
    //update
    const cartItems = await db.collection('users').updateOne({id: userId}, {
        $pull: {cartItems: productId}
    })
    const user = await db.collection('users').findOne({id: userId})
    const products = await db.collection('products').find({}).toArray()
    const cartItemIds = user.cartItems;
    const cartItemsAfter = cartItemIds.map(id => products.find(product => product.id === id))
    //sent back update data to client
    res.status(200).json(cartItemsAfter)
    client.close()
})

// getting data for user shopping cart
app.get('/api/users/:userId/cart',async (req, res) => {
    // connect to database
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017/',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    //query get products in user cart
    // return user obj
    const { userId } = req.params;
    const user = await db.collection('users').findOne({ id: userId})
    if(!user) return res.status(404).json('Could not find user')
    // Trường hợp user exist thì lấy products trả về cho user
    else {
        const products = await db.collection('products').find({}).toArray()
        //point to user obj to get productid inside cartItems and map it with cartItems to get user shopping cart product obj
        const cartItemIds = user.cartItems;
        const cartItems = cartItemIds.map(id => products.find(product => product.id === id))
        res.status(200).json(cartItems)
    }
    client.close()
})

// getting endpoint for product detail
app.get('/api/products/:productId', async (req, res) => {
    // connect to database
    const client = await MongoClient.connect(
        'mongodb://127.0.0.1:27017/',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    const { productId } = req.params
    const product = await db.collection('products').find({id: productId}).toArray()
    if (product) {
        res.status(200).json(product);
    }else
        res.status(404).json("Could not find the product!")

    client.close()
})


app.listen(8000, () =>{
    console.log('server is listen on port 8000')
})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/wdb`, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
connectDB();

async function createListing(client, newListing){
    const result = await client.db("wdb").collection("products")
        .insertMany(newListing)

    console.log(`New listing with the following id: ${result.insertedId}`);
}

async function createOneUser(client, newListing){
    const result = await client.db("wdb").collection("users")
        .insertOne(newListing)

    console.log(`New User with the following id: ${result.insertedId} created`);
}