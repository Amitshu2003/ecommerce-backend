import OrderModel from "../models/Order.js"
import OrderItemsModel from "../models/OrderItem.js"
import CustomerModel from "../models/Customer.js"
import ProductModel from "../models/Product.js"

const customerOrderResolver = {
    Query: {

        // get items in an order(get all the items placed in a single order)
        async getItemsInAOrder(_, { ID }) {
            const result = await OrderItemsModel.find({ OrderID: ID })
            return result
        },

        //get all orders with items of customers(orders, order items)
        async get_Order_OrderItems(_, { ID }) {
            let result = await OrderModel.aggregate([
                {
                    $match:
                    {
                        $and: [
                            { $expr: { $eq: ['$CustomerID', { $toObjectId: ID }] } },
                            { "isCheckOut": false }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'orderitems',
                        localField: '_id',
                        foreignField: 'OrderID',
                        as: 'orderItems'
                    }
                }
            ])

            return result
        },

        //get all orders with items of customers with Product Name (orders, order items)
        async get_OrderItems_With_P_Name(_, { ID }) {

            let result = await OrderModel.aggregate([
                {
                    $match: {
                        $and: [
                            { $expr: { $eq: ['$CustomerID', { $toObjectId: ID }] } },
                            { "isCheckOut": false }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'orderitems',
                        localField: '_id',
                        foreignField: 'OrderID',
                        as: 'orderItem'
                    }
                },
                {
                    $unwind: '$orderItem'
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'orderItem.ProductID',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: '$product'
                },
                {
                    $addFields: {
                        'ProductName': '$product.ProductName'
                    }
                },
                {
                    $project: {
                        'product': 0 // Exclude the 'product' field , not needed
                    }
                }
            ]);

            return result
        },


    },
    Mutation: {
        // delete a customer(delete his orders, orderitems)
        async deleteCustomerWithOrderItems(_, { ID }) {
            try {
                const result = await OrderModel.find({ CustomerID: ID })

                for (let i = 0; i < result.length; i++) {
                    const { _id: id } = result[i]
                    await OrderItemsModel.deleteMany({ OrderID: id })
                }

                await OrderModel.deleteMany({ CustomerID: ID })
                await CustomerModel.findByIdAndDelete({ _id: ID })

                return "Customer Deleted Successfully with his orders and order items"
            } catch (error) {
                console.log(error);
                return "internal server error"
            }
        },

        // add to cart( when ever items are added, we have to add the unit price)
        async addItemToCart(_, { CustomerID: ID, ProductName, Quantity }) {

            let latestOrder = await OrderModel.find({ CustomerID: ID, isCheckOut: false }).sort({ OrderDate: -1 }).limit(1)

            if (latestOrder.length === 0) {
                const order = new OrderModel({ CustomerID: ID })
                const newOrder = await order.save()
                latestOrder.push(newOrder)
            }

            let productExist = await ProductModel.find({ ProductName: { '$regex': new RegExp(ProductName), $options: 'i' }, isDiscontinued: false })

            if (productExist.length === 0) return "Product is either unavailable or not exists."

            let { _id: OrderID, TotalAmount } = latestOrder[0]
            let { _id: ProductID, UnitPrice } = productExist[0]

            let orderItem = new OrderItemsModel({ OrderID, ProductID, UnitPrice, Quantity })
            await orderItem.save()

            let totalAmount = TotalAmount + (UnitPrice * Quantity)

            const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: OrderID }, { TotalAmount: totalAmount }, { new: true })

            return "item added into cart successfully"
        },

        // delete from cart(we have to remove that item and its unit price)
        async deleteItemFromCart(_, { OrderID: ID, ProductName }) {

            const product = await ProductModel.findOne({ ProductName: { '$regex': new RegExp(ProductName), $options: 'i' } })
            if (!product) return "product does not exists"

            const { _id: productId } = product

            const deletedItem = await OrderItemsModel.findOneAndDelete({ OrderID: ID, ProductID: productId })
            if (!deletedItem) return "product is not added into the cart"

            const { UnitPrice, Quantity } = deletedItem

            const order = await OrderModel.findById({ _id: ID })
            const updatedAmount = (order.TotalAmount) - (UnitPrice * Quantity)

            const updatedOrder = await OrderModel.findByIdAndUpdate({ _id: ID }, { TotalAmount: updatedAmount }, { new: true })

            return "item deleted from cart successfully"
        },

        async checkOutOrder(_, { ID }) {
            const result = await OrderModel.findByIdAndUpdate({ _id: ID }, { isCheckOut: true }, { new: true })
            const totalAmount = result.TotalAmount
            return `Checked Out Successfully. Your total amount is  ${totalAmount}`
        }
    }

}
export default customerOrderResolver

