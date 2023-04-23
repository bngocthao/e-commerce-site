import express from 'express'
import bodyParser from 'body-parser'
const mongoose = require('mongoose')
// use mongodb connection
import {ServerApiVersion} from "mongodb";
import { MongoClient } from 'mongodb';
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://b1812378:fR2Lydbw@cluster0.ofhpjzs.mongodb.net/?retryWrites=true&w=majority";

// const user = {id: '12345', cartItems: ['123', '234', '456']}

const products = [{
    id: '123',
    name: 'Running Shoes',
    price: '60.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-1.jpg',
    averageRating: '5.0',
}, {
    id: '234',
    name: 'Basketball Shoes',
    price: '120.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-2.jpg',
    averageRating: '5.0',
}, {
    id: '345',
    name: 'Bright Red Shoes',
    price: '90.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-3.jpg',
    averageRating: '5.0',
}, {
    id: '456',
    name: 'Fancy Shoes',
    price: '190.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-4.jpg',
    averageRating: '5.0',
}, {
    id: '567',
    name: 'Skateboard Shoes',
    price: '75.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-5.jpg',
    averageRating: '5.0',
}, {
    id: '678',
    name: 'High Heels',
    price: '200.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-6.jpg',
    averageRating: '5.0',
}, {
    id: '789',
    name: 'Dark Shoes',
    price: '100.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-7.jpg',
    averageRating: '5.0',
}, {
    id: '890',
    name: 'Classic Shoes',
    price: '40.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-8.jpg',
    averageRating: '5.0',
}, {
    id: '901',
    name: 'Plain Shoes',
    price: '54.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/images/watch-9.jpg',
    averageRating: '5.0',
},
    {
        id: '112',
        name: 'Teal Dress Shoes',
        price: '330.00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/images/watch-10.jpg',
        averageRating: '5.0',
    },
    {
        id: '223',
        name: 'Fancy Boots',
        price: '230.00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/images/watch-11.jpg',
        averageRating: '5.0',
    }, {
        id: '334',
        name: 'Gold Shoes',
        price: '180.00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
        imageUrl: '/images/watch-12.jpg',
        averageRating: '5.0',
    }];

export let cartItems = [
    products[0],
    products[2],
    products[3],
];

const app = express()
app.use(bodyParser.json())

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
    // connect to database
    const client = await MongoClient.connect(
        'mongodb://localhost:27017',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    const { userId } = req.body
    const { productId } = req.body
    // const user = await db.collection('Users').findOne({ id: userId })
    // if(!user) return res.status(404).json('Could not find user')
    // // Trường hợp user exist thì đẩy id của món hàng lên
    // else

    await db.collection('Users').updateOne({id: userId}, {
        $addToSet: {cartItems: productId}
    })
    const user = await db.collection('Users').findOne({id: userId})
    const cartItemids = user.cartItems
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
        'mongodb://localhost:27017',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    const { userId, productId } = req.params;
    //update
    const cartItems = await db.collection('Users').updateOne({id: userId}, {
        $pull: {cartItems: productId}
    })
    const user = await db.collection('Users').findOne({id: userId})
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
        'mongodb://localhost:27017',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    //query get products in user cart
    // return user obj
    const { userId } = req.params;
    const user = await db.collection('Users').findOne({ id: userId})
    if(!user) return res.status(404).json('Could not find user')
    // Trường hợp user exist thì lấy products trả về cho user
    else {
        const products = await db.collection('Products').find({}).toArray()
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
        'mongodb://localhost:27017',
        {useNewUrlParser:true, useUnifiedTopology: true}
    )
    const db = client.db('wdb')

    const { productId } = req.params
    const product = await db.collection('Products').find({id: productId}).toArray()
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
    const result = await client.db("wdb").collection("Products")
        .insertMany(newListing)

    console.log(`New listing with the following id: ${result.insertedId}`);
}

async function createOneUser(client, newListing){
    const result = await client.db("wdb").collection("Users")
        .insertOne(newListing)

    console.log(`New User with the following id: ${result.insertedId} created`);
}