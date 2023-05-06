import { Movie } from '@prisma/client'
import { prisma } from '../config/config'

export const createMovie = async (userId: number, { title, description, director, releaseDate }: { title: string, description: string, director: string, releaseDate: Date }) => {
    const movie = await prisma.movie.create({
        data: {
            userId,
            title,
            description,
            director,
            releaseDate
        }
    })
    return movie
}

export const updateMovie = async (movieData: Movie) => {
    const movie = await prisma.movie.update({
        where: {
            id: movieData.id
        },
        data: {
            ...movieData
        }
    })
    return movie
}

export const deleteMovie = async (id: number) => {
    const movie = await prisma.movie.delete({
        where: {
            id
        }
    })
    return movie
}

export const findMovieById = async (id: number) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id
        }
    })
    return movie
}

export const findMovies = async (query: string, entry: number, page: number) => {
    const movie = await prisma.movie.findMany({
        where: {
            OR: [{
                title: {
                    contains: query
                },
            }, {
                description: {
                    contains: query
                }
            }]
        },
        orderBy: {
            title: 'asc'
        },
        take: entry,
        skip: page
    })
    return movie
}