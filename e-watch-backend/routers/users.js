const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
// adding product to user shopping cart
const {MongoClient} = require("mongodb")
const bcrypt = require('bcryptjs')
const {stringify} = require("nodemon/lib/utils");
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// get all users
router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash')

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
})

//get a single user
router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')

    if(!user) {
        res.status(500).json({message: "User with this id was not found"})
    }
    res.status(200).send(user)
})

// create a single data
router.post('/register', async (req, res) => {
    // generate a salt value
    const salt = bcrypt.genSaltSync(10);
    const data = stringify(req.body.password)

    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(data, salt),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save()

    if(!user)
        return res.status(400).send('user cannot be create')

    res.send(user)
})

// update account (chưa test)
router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id)
    let newPassword
    if(req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const data = stringify(req.body.password)
        newPassword = bcrypt.hashSync(data, salt)
    } else {
        newPassword = userExist.passwordHash
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.city,
            country: req.body.country
        },
        {new: true}
    )
    if(!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
})


// delete chưa test
router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

// count number of user
router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})


// login
router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const password = stringify(req.body.password)

    // const generateSecretKey = (length) => {
    //     return crypto.randomBytes(length).toString('hex')
    // }
    // // Generate 32 byte (256 bit) secret key
    // const secretKey = generateSecretKey(32)

    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            'BuiHoangYen',
            {expiresIn : '1d'}
        )

        res.status(200).send({user: user.email , token: token})
    } else {
        res.status(400).send('password is wrong!');
    }


})

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