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
const authJwt = require('../helpers/jwt')
const errorHandler = require('../helpers/error-handler')
//middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({message: "The user is not authorized"})
  }

  if (err.name === 'ValidationError') {
    //  validation error
    return res.status(401).json({message: err})
  }

  // default to 500 server error
  return res.status(500).json(err)})

//routes
const categoriesRoutes = require('../routers/categories')
const productsRoutes = require('../routers/products')
const usersRoutes = require('../routers/users')
const ordersRoutes = require('../routers/orders')

//use route
app.use('/api/categories', categoriesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/orders', ordersRoutes)




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

