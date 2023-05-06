import http from 'http'

import { PORT } from './config/config'
import server from './app'

http.createServer(server).listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})