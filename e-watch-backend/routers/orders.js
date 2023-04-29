const {Order} = require('../models/order')
const express = require('express')
const { OrderItem } = require('../models/order-item')
const router = express.Router()

router.get('/', async (req, res) => {
    // tìm danh sách đơn hàng thông qua obj user
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered;': -1})

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList)
})

// get thông tin chi tiết của đơn hàng
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        })
})