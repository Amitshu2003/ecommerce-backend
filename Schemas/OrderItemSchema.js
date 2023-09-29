const OrderItemSchema = `#graphql
    type OrderItem{
        _id: ID!
        OrderID: ID!
        ProductID: ID!
        UnitPrice: Float
        Quantity: Int
    }

    input OrderItemInput{
        OrderID: ID!
        ProductID: ID!
        Quantity: Int
    }

    type Query{
        OrderItem(ID:ID!): OrderItem!
        getOrderItems:[OrderItem]
    }

    type Mutation{
        createOrderItem(OrderItemInput:OrderItemInput): OrderItem!
        deleteOrderItem(ID:ID!):String
        updateOrderItem(ID:ID!,Quantity: Int):OrderItem!
    }
`
export default OrderItemSchema