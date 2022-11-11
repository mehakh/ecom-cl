import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFoundUrl } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import morgan from 'morgan'

dotenv.config()

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
connectDB()

app.use(express.json())
// app.use(filterRequest)
app.use('/api/products', productRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/paypal/config', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
    res.send('App is running.........')
})


app.use(notFoundUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'development'

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`))