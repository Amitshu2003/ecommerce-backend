import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    CustomerID:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Customer' 
    },
    TotalAmount:{
        type:Number,
        default:0
    },
    OrderDate:{
        type:Date,
        default: Date.now
    },
    isCheckOut:{
        type: Boolean,
        default:false
    }
})

const OrderModel = mongoose.model('Order',orderSchema)
export default OrderModel