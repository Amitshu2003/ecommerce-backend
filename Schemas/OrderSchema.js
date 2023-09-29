const OrderSchema = `#graphql
    scalar Date

    type Order{
        _id: ID!
        OrderDate: Date
        CustomerID: ID!
        TotalAmount: Float
    }

    type Query{
        Order(ID:ID!): Order!
        getOrders:[Order]
        getOrderItems(ID:ID!):[OrderItem]
    }

    type Mutation{
        createOrder(CustomerID: ID!): Order!
        deleteOrder(ID:ID!):String
        updateOrder(ID:ID!,CustomerID: ID!):Order!
    }
`
export default OrderSchema