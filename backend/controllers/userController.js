import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../token/generateToken.js'


const login = asyncHandler(async (req, res) => {

    const loginRequest = req.body
    const email = loginRequest.email
    const user = await User.findOne({ email })


    if (user && (await user.matchPassword(loginRequest.password))) {
        return res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {

    const registerRequest = req.body
    const email = registerRequest.email
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create(registerRequest)


    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getProfile = asyncHandler(async (req, res) => {

    const user = User.findById(req.params.id)
    if (user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.body._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await User.create(user)
        console.log('update nè')
        res.send(updatedUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    res.send(users)

})

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.send({ message: 'Deleted' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

const updateUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        await user.save()
        res.send(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

export { login, getProfile, registerUser, updateProfile, getUsers, deleteUser, getUserById, updateUserById }