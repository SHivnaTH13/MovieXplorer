import { PrismaClient } from '@prisma/client'
require('dotenv').config()

const PORT = process.env.PORT!

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!

const prisma = new PrismaClient()

export { PORT, JWT_SECRET_KEY, prisma }