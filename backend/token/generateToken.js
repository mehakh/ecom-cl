import { json } from 'express'
import jwt from 'jsonwebtoken'


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '300000000000000' })
	
	
}

export { generateToken }