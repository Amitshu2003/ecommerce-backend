const ProductSchema = `#graphql
    type Product{
        id: ID!
        ProductName: String
        SupplierID: ID
        UnitPrice: Float
        Package: String
        isDiscontinued: Boolean
    }

    input ProductInput{
        ProductName: String
        SupplierID: ID
        UnitPrice: Float
        Package: String
        isDiscontinued: Boolean
    }

    type Query{
        Product(ID:ID!): Product!
        getProducts:[Product]
    }

    type Mutation{
        createProduct(ProductInput:ProductInput): Product!
        deleteProduct(ID:ID!):String
        updateProduct(ID:ID!,ProductInput:ProductInput):Product!
    }
`
export default ProductSchema