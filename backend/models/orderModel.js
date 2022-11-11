import mongooes from 'mongoose'

const orderSchema = mongooes.Schema({
    user: {
        type: mongooes.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true,
                default: 1
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            product: {
                type: mongooes.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            require: true,
        },
        postalCode: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        country: {
            type: String,
            require: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        }
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },

},
    {
        timestamp: true
    }
)

const Order = mongooes.model('Order', orderSchema)

export default Order