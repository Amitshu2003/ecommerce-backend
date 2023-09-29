import SupplierModel from "../models/Supplier.js"

const SupplierResolver = {
    Query: {
        async Supplier(_, { ID }) {
            const Supplier = await SupplierModel.findById(ID)
            return Supplier
        },

        async getSuppliers() {
            return await SupplierModel.find();
        }

    },

    Mutation: {
        async createSupplier(_, { SupplierInput: { CompanyName, ContactName, City, Country, Phone, Fax } }) {
            const Supplier = new SupplierModel({ CompanyName, ContactName, City, Country, Phone, Fax })
            const result = await Supplier.save()
            return result
        },

        async deleteSupplier(_, { ID }) {
            const wasDeleted = (await SupplierModel.deleteOne({ _id: ID })).deletedCount
            if (!wasDeleted) return "No Supplier Exists"
            return "Supplier deleted Successfully"
        },

        async updateSupplier(_, { ID, SupplierInput: { CompanyName, ContactName, City, Country, Phone, Fax } }) {
            try {
                const SupplierExist = await SupplierModel.findById(ID)
                if (!SupplierExist) return "Not Exists"
                const Supplier = await SupplierModel.findByIdAndUpdate(ID, { CompanyName, ContactName, City, Country, Phone, Fax }, { new: true })
                return Supplier
            } catch (error) {
                console.log("Error : ", error);
                return "Internal Server Error"
            }
        }

    }
}

export default SupplierResolver
