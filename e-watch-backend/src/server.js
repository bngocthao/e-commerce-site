import express from 'express'
import bodyParser from 'body-parser'
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
app.use(bodyParser.json())
import path from 'path'
// use mongodb connection
import {ServerApiVersion} from "mongodb";
import { MongoClient } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://b1812378:fR2Lydbw@cluster0.ofhpjzs.mongodb.net/?retryWrites=true&w=majority";

//middleware
app.use(express.json())
app.use(morgan('tiny'))

//routes
const categoriesRoutes = require('../routers/categories')
const productsRoutes = require('../routers/products')

//use route
app.use('/api/categories', categoriesRoutes)
app.use('/api/products', productsRoutes)

//dùng để load ảnh
// app.use('/images', express.static(path.join(__dirname, '../assets')))

// app.get('/api/products', async (req, res) => {
//   // connect to database
//   const client = await MongoClient.connect(
//       'mongodb://127.0.0.1:27017/',
//       {useNewUrlParser:true, useUnifiedTopology: true}
//   )
//   const db = client.db('wdb')
//
//   //query get products
//   const products = await db.collection('products').find({}).toArray()
//   res.status(200).json(products)
//
//   //close db?
//   client.close()
// })

app.listen(3000, () =>{
  console.log('server is listen on port 3000')
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/wdbs`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
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