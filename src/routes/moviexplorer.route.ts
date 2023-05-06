import { Router } from 'express'
import moviexplorer from '../controllers/moviexplorer.controller'
import { checkUser, verifyUser } from '../middlewares/auth.middleware'

const router = Router()

router.get('/moviexplorer', verifyUser, checkUser, moviexplorer)

export default router