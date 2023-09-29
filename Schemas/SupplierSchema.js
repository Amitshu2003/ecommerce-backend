const SupplierSchema = `#graphql
    type Supplier{
        id: ID!
        CompanyName: String
        ContactName: String
        City: String
        Country: String
        Phone: String
        Fax: String
    }

    input SupplierInput{
        CompanyName: String
        ContactName: String
        City: String
        Country: String
        Phone: String
        Fax: String
    }

    type Query{
        Supplier(ID:ID!): Supplier!
        getSuppliers:[Supplier]
    }

    type Mutation{
        createSupplier(SupplierInput:SupplierInput): Supplier!
        deleteSupplier(ID:ID!):String
        updateSupplier(ID:ID!,SupplierInput:SupplierInput):Supplier!
    }
`
export default SupplierSchema