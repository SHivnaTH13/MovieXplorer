import { Router } from 'express'
import logout from '../controllers/logout.controller'

const router = Router()

router.get('/logout', logout)

export default router