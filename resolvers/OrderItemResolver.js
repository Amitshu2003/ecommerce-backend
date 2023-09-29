import OrderModel from "../models/Order.js"
import ProductModel from "../models/Product.js"
import OrderItemModel from "../models/OrderItem.js"

const OrderItemResolver = {
    Query: {
        async OrderItem(_, { ID }) {
            const OrderItem = await OrderItemModel.findById(ID)
            return OrderItem
        },

        async getOrderItems() {
            return await OrderItemModel.find();
        }

    },

    Mutation: {
        async createOrderItem(_, { OrderItemInput: { OrderID, ProductID, Quantity } }) {
            const { UnitPrice } = await ProductModel.findOne({ _id: ProductID })

            const OrderItem = new OrderItemModel({ OrderID, ProductID, UnitPrice, Quantity })
            const result = await OrderItem.save()

            const order = await OrderModel.findOne({ _id: OrderID })

            const updateAmount = order.TotalAmount + (UnitPrice * Quantity);
            const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: OrderID }, { TotalAmount: updateAmount }, { new: true })

            console.log(updatedOrder);

            return result
        },

        async deleteOrderItem(_, { ID }) {
            const wasDeleted = (await OrderItemModel.deleteOne({ _id: ID })).deletedCount
            if (!wasDeleted) return "No OrderItem Exists"
            return "OrderItem deleted Successfully"
        },

        async updateOrderItem(_, { ID, Quantity }) {
            try {
                const OrderItemExist = await OrderItemModel.findById(ID)
                if (!OrderItemExist) return "Not Exists"
                const OrderItem = await OrderItemModel.findByIdAndUpdate(ID, { Quantity }, { new: true })

                return OrderItem
            } catch (error) {
                console.log("Error : ", error);
                return "Internal Server Error"
            }
        }

    }
}

export default OrderItemResolver
