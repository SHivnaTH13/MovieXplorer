import { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { createUser, findUser, findUserById, updateUser } from '../services/user.service'
import { JWT_SECRET_KEY } from '../config/config'
import { User } from '../types/User'
import { Errors } from '../data/Errors'
import { validation } from '../validations/auth.validation'
import { Passwd } from '../types/Passwd'
import { jwtPromise } from '../utils/jwtPromise'

const MAX_AGE = 60 * 60 * 24

const signUp = async (args: User, { res }: { res: Response }) => {
    let { username, email, password } = args
    let result = { errors: { username: '', email: '', password: '' }, username: '', email: '', password: '' }
    try {
        validation(args)
        const salt = await bcrypt.genSalt(12)
        password = await bcrypt.hash(password, salt)
        const user = await createUser(username, email, password)
        const token = createToken(user.id)
        res.cookie('jwt', token, { maxAge: MAX_AGE * 1000, httpOnly: true })
        result.username = user.username
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                result.errors.email = "email id already exists"
            }
        } else if (err instanceof Errors) {
            result.errors = err.getAuthErrors()
        }
    }
    return result
}

const login = async (args: User, { res }: { res: Response }) => {
    let { email, password } = args
    let result = { errors: { username: '', email: '', password: '' }, username: '', email: '', password: '' }
    try {
        validation(args)
        const user = await findUser(email)
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                const token = createToken(user.id)
                res.cookie('jwt', token, { maxAge: MAX_AGE * 1000, httpOnly: true })
                result.username = user.username
            } else {
                result.errors.password = 'incorrect password'
                throw new Errors().setAuthErrors(result)
            }
        } else {
            result.errors.email = 'incorrect email id'
            throw new Errors().setAuthErrors(result)
        }
    } catch (err) {
        if (err instanceof Errors) {
            result.errors = err.getAuthErrors()
        }
    }
    return result
}

const passwd = async (args: Passwd, { req }: { req: Request }) => {
    let result = { token: '', password: '' }
    let { oldPassword, newPassword } = args
    if (newPassword === '') {
        result.password = 'please provide password'
    } else {
        let token: string = req.cookies.jwt
        if (token) {
            let id: any = undefined
            try {
                id = await jwtPromise(token)
                const user = await findUserById(id)
                if (user) {
                    const auth = await bcrypt.compare(oldPassword, user.password)
                    if (auth) {
                        try {
                            const salt = await bcrypt.genSalt(12)
                            newPassword = await bcrypt.hash(newPassword, salt)
                            await updateUser(user.email, newPassword)
                            result.password = 'password successfully changed'
                        } catch (error) {
                            result.password = 'something went wrong'
                        }
                    } else {
                        result.password = 'incorrect password'
                    }
                } else {
                    result.password = 'something went wrong'
                }
            } catch (err) {
                result.token = 'token verification failed'
            }
        } else {
            result.token = 'please log in to change password'
        }
    }
    return result
}

const createToken = (id: number) => {
    return jwt.sign({ id }, JWT_SECRET_KEY, {
        expiresIn: MAX_AGE  // in seconds
    })
}

export { signUp, login, passwd }