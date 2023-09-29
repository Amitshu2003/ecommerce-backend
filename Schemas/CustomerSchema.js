const customerSchema = `#graphql
    type Customer{
        id: ID!
        FirstName: String
        LastName: String
        City: String
        Country: String
        Phone: String
    }


    input CustomerInput{
        FirstName: String
        LastName: String
        City: String
        Country: String
        Phone: String
    }


    type Query{
        customer(ID:ID!): Customer!
        getCustomers:[Customer]
    }

    type Mutation{
        createCustomer(customerInput:CustomerInput): Customer!
        deleteCustomer(ID:ID!):String
        updateCustomer(ID:ID!,customerInput:CustomerInput):Customer!
    }
`
export default customerSchema