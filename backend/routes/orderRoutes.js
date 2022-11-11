import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { admin, filterRequest } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(filterRequest, addOrderItems).get(filterRequest, admin, getOrders)
router.route('/myorders').get(filterRequest, getMyOrders)
router.route('/:id').get(filterRequest, getOrderById)
router.route('/:id/pay').put(filterRequest, updateOrderToPaid)
router.route('/:id/deliver').put(filterRequest, updateOrderToDelivered)

export default router