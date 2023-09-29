import CustomerModel from "../models/Customer.js"

const customerResolver = {
    Query: {
        async customer(_, { ID }) {
            const customer = await CustomerModel.findById(ID)
            return customer
        },

        async getCustomers() {
            return await CustomerModel.find();
        }

    },

    Mutation: {
        async createCustomer(_, { customerInput: { FirstName, LastName, City, Country, Phone } }) {
            const Customer = new CustomerModel({ FirstName, LastName, City, Country, Phone })
            const result = await Customer.save()
            return result
        },

        async deleteCustomer(_, { ID }) {
            const wasDeleted = (await CustomerModel.deleteOne({ _id: ID })).deletedCount
            if (!wasDeleted) return "No Customer Exists"
            return "Customer deleted Successfully"
        },

        async updateCustomer(_, { ID, customerInput: { FirstName, LastName, City, Country, Phone } }) {
            try {
                const customerExist = await CustomerModel.findById(ID)
                if (!customerExist) return "Not Exists"
                const customer = await CustomerModel.findByIdAndUpdate(ID, { FirstName, LastName, City, Country, Phone }, { new: true })

                return customer
            } catch (error) {
                console.log("Error : ", error);
                return "Internal Server Error"
            }
        }

    }
}

export default customerResolver
