import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('Database connected')
    } catch (error) {

        console.log(`Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB