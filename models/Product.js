import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    ProductName: String,
    SupplierID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier'
    },
    UnitPrice: Number,
    Package : String,
    isDiscontinued: Boolean
})

const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel