import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    CompanyName: String,
    ContactName: String,
    City: String,
    Country: String,
    Phone: Number,
    Fax: String
})

const SupplierModel = mongoose.model('Supplier', supplierSchema)
export default SupplierModel