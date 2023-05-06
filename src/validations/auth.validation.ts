import isEmail from 'validator/lib/isEmail.js'
import { Errors } from '../data/Errors'

export const validation = ({ username, email, password }: { username: string, email: string, password: string }) => {
    let errors = { username: '', email: '', password: '' }
    const err = new Errors()
    if (username === '' || email === '' || password === '') {
        if (username === '') {
            errors.username = 'please provide username'
        }
        if (email === '') {
            errors.email = 'please provide email id'
        }
        if (password === '') {
            errors.password = 'please provide password'
        }
        err.setAuthErrors(errors)
        throw err
    }
    if (!isEmail(email)) {
        errors.email = 'please provide valid email id'
        err.setAuthErrors(errors)
        throw err
    }
    if (password.length < 7) {
        errors.password = 'password length should be greater than 6'
        err.setAuthErrors(errors)
        throw err
    }
}