import { Router } from 'express'
import register from '../controllers/register.controller'

const router = Router()

router.get('/register', register)

export default router