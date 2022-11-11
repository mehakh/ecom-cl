import express from 'express'
import { deleteUser, getProfile, getUserById, getUsers, login, registerUser, updateProfile, updateUserById } from '../controllers/userController.js'
import { admin, filterRequest } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(login)
router.route('/users').get(filterRequest, admin, getUsers)
router.route('/:id').delete(filterRequest, admin, deleteUser).get(filterRequest, admin, getUserById).put(filterRequest, admin, updateUserById)
router.route('/register').post(registerUser)
router.route('/profile').get(filterRequest, getProfile)
router.route('/update').put(filterRequest, updateProfile)



export default router