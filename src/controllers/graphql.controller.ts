import { ApolloServer, BaseContext } from '@apollo/server'
import typeDefs from '../schemas/types/index'
import resolvers from '../schemas/resolvers/index'

const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
})

export default server