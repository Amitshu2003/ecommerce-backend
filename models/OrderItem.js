import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    OrderID:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Order' 
    },
    ProductID:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    UnitPrice:{
        type:Number,
        default:0
    },
    Quantity:{
        type:Number,
        default:0
    }
})

const orderItemModel = mongoose.model('OrderItem',orderItemSchema)
export default orderItemModel