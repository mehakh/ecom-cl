import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {

    const size = 2
    const page = Number(req.query.page) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.count({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(size).skip(size * (page - 1))
    res.send({ page, pages: Math.ceil(count / size), products })
})

const getProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    if (product) {
        product.remove()
        res.send({ message: 'Deleted' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample Name',
        price: 20,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample categry',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).send(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, brand, category, image, countInStock } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {

        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.brand = brand || product.brand
        product.category = category || product.category
        product.image = image || product.image
        product.countInStock = countInStock || countInStock

        const updatedProduct = await product.save()
        res.send(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const createComment = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {

        // const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        // if (alreadyReviewed) {
        //     res.status(400)
        //     throw new Error('Product already reviewed')
        // }



        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201)
        res.send({ message: 'Product reviewed' })

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const getTopProducts = asyncHandler(async (req, res) => {

    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.send(topProducts)
})

export { getProducts, getProduct, deleteProduct, createProduct, updateProduct, createComment, getTopProducts }