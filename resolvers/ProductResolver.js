import ProductModel from "../models/Product.js"

const ProductResolver = {
    Query: {
        async Product(_, { ID }) {
            const Product = await ProductModel.findById(ID)
            return Product
        },

        async getProducts() {
            return await ProductModel.find();
        }

    },

    Mutation: {
        async createProduct(_, { ProductInput: { ProductName, SupplierID, UnitPrice, Package, isDiscontinued } }) {
            const Product = new ProductModel({ ProductName, SupplierID, UnitPrice, Package, isDiscontinued })
            const result = await Product.save()
            return result
        },

        async deleteProduct(_, { ID }) {
            const wasDeleted = (await ProductModel.deleteOne({ _id: ID })).deletedCount
            if (!wasDeleted) return "No Product Exists"
            return "Product deleted Successfully"
        },

        async updateProduct(_, { ID, ProductInput: { ProductName, SupplierID, UnitPrice, Package, isDiscontinued } }) {
            try {
                const ProductExist = await ProductModel.findById(ID)
                if (!ProductExist) return "Not Exists"
                const Product = await ProductModel.findByIdAndUpdate(ID, { ProductName, SupplierID, UnitPrice, Package, isDiscontinued }, { new: true })

                return Product
            } catch (error) {
                console.log("Error : ", error);
                return "Internal Server Error"
            }
        }

    }
}

export default ProductResolver
