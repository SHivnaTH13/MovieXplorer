import { Router } from 'express'
import home from '../controllers/home.controller'
import { checkUser } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', checkUser, home)

export default router