import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import graphql from './routes/graphql.route'
import home from './routes/home.route'
import login from './routes/login.route'
import logout from './routes/logout.route'
import register from './routes/register.route'
import moviexplorer from './routes/moviexplorer.route'

const app = express()

app.set('view engine', 'ejs')

app.use(cors(), bodyParser.json(), cookieParser())

app.use(graphql)
app.use(home)
app.use(login)
app.use(logout)
app.use(register)
app.use(moviexplorer)

export default app