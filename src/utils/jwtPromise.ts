import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config/config'

export const jwtPromise = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, async (err: any, payload: any) => {
            if (err) {
                reject(undefined)
            } else {
                resolve(payload.id)
            }
        })
    })
}