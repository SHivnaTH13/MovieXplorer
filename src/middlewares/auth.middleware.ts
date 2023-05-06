import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../config/config'
import { findUserById } from '../services/user.service'

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, (err: any) => {
            if (err) {
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, async (err, payload: any) => {
            if (err) {
                res.locals.username = undefined
                next()
            } else {
                const user = await findUserById(payload.id)
                if (user) {
                    res.locals.userId = user.id
                    res.locals.username = user.username
                    next()
                }
                res.locals.username = undefined
                next()
            }
        })
    } else {
        res.locals.username = undefined
        next()
    }
}

export { verifyUser, checkUser }