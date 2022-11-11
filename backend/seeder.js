import dotenv from 'dotenv'
import connectDB from './config/database.js'
import products from './data/products.js'
import users from './data/users.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'


dotenv.config()

connectDB()

const importData = async () => {

    try {

        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)

        const adminUser = createdUser[0]._id

        const sampleProducts = products.map(product => {
            return {
                ...product, user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported')
        process.exit()

    } catch (error) {

        console.log(`Erorr is: ${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {

    try {

        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed')
        process.exit()

    } catch (error) {

        console.log(`Erorr is: ${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}

