import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    City: String,
    Country: String,
    Phone: Number
})

const CustomerModel = mongoose.model('Customer',customerSchema)
export default CustomerModel