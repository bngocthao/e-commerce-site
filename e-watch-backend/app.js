import express from "express"
import bodyParser from "body-parser"
const app = express();
app.use(bodyParser.json())
import path from "path";

//middleware
const mongoose = require("mongoose")
const morgan = require("morgan")
app.use(express.json)
app.use(morgan("tiny"))

// define models
const Product = require('../models/product')
const Categoty = require('../models/category')
// define router
const productsRoutes = require('../routers/products')
const categoriesRoutes = require('../routers/categories')
// const usersRouter = require('../routers/users')
// calling router to use, đã định nghĩa sẳn tiền tố cho router
app.use('api/products', productsRoutes)
app.use('api/categories', categoriesRoutes)
// app.use('api/users', usersRouter)

// use mongodb connection
// import {ServerApiVersion} from "mongodb";
import { MongoClient } from "mongodb";
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://b1812378:fR2Lydbw@cluster0.ofhpjzs.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/wdbs`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

app.listen(3000, () =>{
    console.log('server is listen on port 3000')
})

connectDB()

