const customerOrderSchema = `#graphql
    type itemsInOrder{
        _id: ID!
        TotalAmount:Float
        OrderDate: Date
        orderItems:[OrderItem]
    }

    type itemsWithPName{
        _id: ID!
        TotalAmount:Float
        OrderDate: Date
        orderItem:OrderItem!
        ProductName:String
    }


    type Query{
        getItemsInAOrder(ID:ID!):[OrderItem]
        get_Order_OrderItems(ID:ID!):[itemsInOrder]
        get_OrderItems_With_P_Name(ID:ID!):[itemsWithPName]
    }

    type Mutation{
        deleteCustomerWithOrderItems(ID:ID!):String       
        addItemToCart( CustomerID:ID!, ProductName: String, Quantity: Int):String
        deleteItemFromCart(OrderID:ID!,ProductName:String):String
        checkOutOrder(ID:ID):String
    }
`
export default customerOrderSchema