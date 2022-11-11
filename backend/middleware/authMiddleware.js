import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const filterRequest = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user) {
                throw new Error('User does not exist')
            }
            next()

        } catch (error) {
            res.status(401)
            throw new Error(error.message)
        }
    } else {
        throw new Error('Unauthorized user')
    }

})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authrized as an Admin')
    }
}

export { filterRequest, admin }