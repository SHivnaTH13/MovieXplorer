import { Prisma } from '@prisma/client'
import { Request } from 'express'

import { jwtPromise } from '../utils/jwtPromise'
import { createMovie, deleteMovie, findMovies, findMovieById, updateMovie } from '../services/movie.service'
import { validation } from '../validations/movie.validation'
import { MovieIDJSON, MovieJSON, MovieList } from '../types/MovieJSON'
import { Errors } from '../data/Errors'
import isDate from 'validator/lib/isDate'

const addMovie = async (args: MovieJSON, { req }: { req: Request }) => {
    let result = { error: '', title: '', description: '', director: '', releaseDate: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            validation(args)
            const movieData = { ...args, releaseDate: new Date(args.releaseDate) }
            if (typeof id === 'number') {
                const movie = await createMovie(id, movieData)
                result = { error: '', ...movie, releaseDate: movie.releaseDate.toUTCString() }
            } else {
                result.error = 'something went wrong'
            }
        } catch (err) {
            if (err) {
                if (err instanceof Errors) {
                    result = { error: '', ...err.getMovieErrors() }
                } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        result.error = 'movie already exits'
                    }
                }
            } else {
                result.error = 'token verification failed'
            }
        }
    } else {
        result.error = 'please login to use this service'
    }
    return result
}

const updateMovieData = async (args: MovieIDJSON, { req }: { req: Request }) => {
    let result = { error: '', title: '', description: '', director: '', releaseDate: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            let movie = await findMovieById(args.id)
            if (movie) {
                if (movie.userId === id) {
                    if (args.title !== '') {
                        movie.title = args.title
                    }
                    if (args.description !== '') {
                        movie.description = args.description
                    }
                    if (args.director !== '') {
                        movie.director = args.director
                    }
                    if (args.releaseDate != '') {
                        if (isDate(args.releaseDate)) {
                            movie.releaseDate = new Date(args.releaseDate)
                        }
                    }
                    movie = await updateMovie(movie)
                    if (movie) {
                        result = { error: '', ...movie, releaseDate: movie.releaseDate.toUTCString() }
                    } else {
                        result.error = 'something went wrong'
                    }
                } else {
                    result.error = 'not allowed to update movie'
                }
            } else {
                result.error = 'please provide correct movie id'
            }
        } catch (err) {
            if (err) {
                if (err instanceof Errors) {
                    result = { error: '', ...err.getMovieErrors() }
                }
            } else {
                result.error = 'token verification failed'
            }
        }
    } else {
        result.error = 'please login to use this service'
    }
    return result
}

const removeMovieData = async (id: number, { req }: { req: Request }) => {
    let result = { error: '', title: '', description: '', director: '', releaseDate: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const userId = await jwtPromise(token)
            let movie = await findMovieById(id)
            if (movie) {
                if (userId === movie.userId) {
                    movie = await deleteMovie(id)
                    result = { error: '', ...movie, releaseDate: movie.releaseDate.toUTCString() }
                } else {
                    result.error = 'not allowed to delete movie'
                }
            } else {
                result.error = 'please provide correct movie id'
            }
        } catch (err) {
            if (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') {
                        result.error = 'please provide correct movie id'
                    }
                    if (err.code === 'P2003') {
                        result.error = 'movieId does not exits'
                    }
                }
            } else {
                result.error = 'token verification failed'
            }
        }
    } else {
        result.error = 'please login to use this service'
    }
    return result
}

const searchMovies = async (query: string, entry: number, page: number, { req }: { req: Request }) => {
    let result: MovieList = { error: '', movies: [] }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            if (typeof id === 'number') {
                const movies = await findMovies(query, entry, page)
                movies.forEach(value => {
                    result.movies.push({ ...value, releaseDate: value.releaseDate.toUTCString() })
                })
            } else {
                result.error = 'something went wrong'
            }
        } catch (err) {
            if (err) {
                console.log(err)
            } else {
                result.error = 'token verification failed'
            }
        }
    } else {
        result.error = 'please login to use this service'
    }
    return result
}

const searchMovie = async (id: number, { req }: { req: Request }) => {
    let result = { error: '', title: '', description: '', director: '', releaseDate: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            await jwtPromise(token)
            const movie = await findMovieById(id)
            if (movie) {
                result = { error: '', ...movie, releaseDate: movie.releaseDate.toUTCString() }
            } else {
                result.error = 'please provide correct movie id'
            }
        } catch (err) {
            if (err) {
                console.log(err)
            } else {
                result.error = 'token verification failed'
            }
        }
    } else {
        result.error = 'please login to use this service'
    }
    return result
}

export { addMovie, updateMovieData, removeMovieData, searchMovies, searchMovie }