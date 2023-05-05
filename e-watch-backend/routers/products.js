const express = require('express')
const router = express.Router()
const {Product} = require('../models/product')
const {Category} = require('../models/category')
const mongoose = require('mongoose')
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

// dùng middleware multer validate file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimeType]
        let uploadError = new Error('invalid image type')

        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').json('-')
        const extension = FILE_TYPE_MAP[file.mimeType]
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({storage: storage})

// get products list v xếp theo cate
router.get("/", async (req, res) => {
    // define filter as an obj
    let filter = {}
    console.log(req.query.categories)
    if(req.query.categories)
    {
        // {category: ..} có nghĩa là nếu user điền vào ds id category thì mới lấy
        filter = {category: String(req.query.categories).split(',')}
    }

    const productList = await Product.find(filter).populate('category')

    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList)
});

// adding product
router.post("/", async(req, res) => {
    // validate category
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid category')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReview: req.body.numReview,
        isFeatured: req.body.isFeatured
    })

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

// update product
router.put('/:id', async (req, res) => {
    // chưa fix đc lỗi check id không hợp lệ
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid product')
    }
    // validate category
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid category')

    const product = await Product.findByIdAndUpdate(
        // hàm ở dưới sẽ check nếu id có hợp lệ hay không,
        // nếu id không hợp lệ nó sẽ treo
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReview: req.body.numReview,
            isFeatured: req.body.isFeatured
        },
        { new: true }
    )

    if(!product)
        return res.status(500).send('this product cannot be updated')

    res.send(product)
})


// getting endpoint for product detail
router.get("/:productId", async (req, res) => {

    const { productId } = req.params;
    const product = await Product.findById(productId).populate('category')
    if (product) {
        res.send(product);
    } else res.status(500).json({success: false});

});

router.get("/get/count", async (req, res) => {
    // get count and return count
    // const productCount = await Product.countDocuments((count) => count)
    const productCount = await Product.countDocuments({})
        .then((count) => count)
        .catch((err) => {
            console.error(err)
        })


    // if(!productCount) {
    //     res.status(500).json({success: false})
    // }
    // bỏ ngoặc nhọn để return json
    res.send({productCount})
})

// get featured products
router.get("/get/featured/:count", async (req, res) => {
    // limit the number feature get
    const count = req.params.count ? req.params.count : 0
    // dấu + phía trước dùng để ép kiểu thành number
    const products = await Product.find({isFeatured: true}).limit(+count)

    if(!products) {
        res.status(500).json({success: false})
    }
    res.send({products})
})

// delete single product
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product) {
            return res.status(200).json({success: true, message: 'Successfully deleted'})
        } else {
            return res.status(404).json({success: false, message: "product not found"})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

// this is call export a module
module.exports = router