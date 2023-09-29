import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from "mongoose"
import customerSchema from "./Schemas/CustomerSchema.js"
import customerResolver from "./resolvers/CustomerResolver.js"
import SupplierSchema from './Schemas/SupplierSchema.js'
import SupplierResolver from './resolvers/SupplierResolver.js'
import OrderSchema from './Schemas/OrderSchema.js'
import OrderResolver from './resolvers/OrderResolver.js'
import ProductSchema from './Schemas/ProductSchema.js'
import ProductResolver from './resolvers/ProductResolver.js'
import OrderItemSchema from './Schemas/OrderItemSchema.js'
import OrderItemResolver from './resolvers/OrderItemResolver.js'
import customerOrderResolver from './resolvers/CustomerOrderResolver.js'
import customerOrderSchema from './Schemas/CustomerOrderSchema.js'


const server = new ApolloServer({
    typeDefs: [customerSchema, SupplierSchema, OrderSchema, ProductSchema, OrderItemSchema, customerOrderSchema],
    resolvers: [customerResolver, SupplierResolver, OrderResolver, ProductResolver, OrderItemResolver, customerOrderResolver]
})


mongoose.connect('mongodb://localhost:27017/miniProjectDB')
    .then(() => console.log('db connected successfully!!!'))
    .catch((err) => console.log('error while connecting db ', err))

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);