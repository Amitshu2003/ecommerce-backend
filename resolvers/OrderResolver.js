import OrderModel from "../models/Order.js"
// import { GraphQLScalarType } from 'graphql';

// const dateScalar = new GraphQLScalarType({
//   name: 'Date',
//   parseValue(value) {
//     return new Date(value);
//   },
//   serialize(value) {
//     return value.toISOString();
//   },
// })

const OrderResolver = {
    // Date: dateScalar,
    Query: {
        async Order(_, { ID }) {
            const Order = await OrderModel.findById(ID)
            return Order
        },

        async getOrders() {
            return await OrderModel.find({ isCheckOut: false });
        }

    },

    Mutation: {
        async createOrder(_, { CustomerID }) {
            const Order = new OrderModel({ CustomerID })
            const result = await Order.save()
            return result
        },

        async deleteOrder(_, { ID }) {
            const wasDeleted = (await OrderModel.deleteOne({ _id: ID })).deletedCount
            if (!wasDeleted) return "No Order Exists"
            return "Order deleted Successfully"
        },

        async updateOrder(_, { ID, CustomerID }) {
            try {
                const OrderExist = await OrderModel.findById(ID)
                if (!OrderExist) return "Not Exists"
                const Order = await OrderModel.findByIdAndUpdate(ID, { CustomerID }, { new: true })

                return Order
            } catch (error) {
                console.log("Error : ", error);
                return "Internal Server Error"
            }
        }

    }
}

export default OrderResolver
