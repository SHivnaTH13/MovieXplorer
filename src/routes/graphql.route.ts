import { Router } from 'express'
import { expressMiddleware } from '@apollo/server/express4'

import server from '../controllers/graphql.controller'

const routes = Router()

server.start().then(() => {
    routes.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }) => {
            return ({ req, res })
        }
    }))
})

export default routes