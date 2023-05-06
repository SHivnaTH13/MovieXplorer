import { prisma } from '../config/config'

export const createUser = async (username: string, email: string, password: string) => {
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
    return user
}

export const findUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export const updateUser = async (email: string, password: string) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            password
        }
    })
    return user
}

export const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}