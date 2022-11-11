import express from 'express'
import { createComment, createProduct, deleteProduct, getProduct, getProducts, getTopProducts, updateProduct } from '../controllers/productController.js'
import { admin, filterRequest } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(filterRequest, admin, createProduct)

router.get('/top', getTopProducts)
router.route('/:id').get(getProduct).delete(filterRequest, admin, deleteProduct).put(filterRequest, admin, updateProduct)
router.route('/:id/reviews').post(filterRequest, createComment)

export default router