import { Prisma, Review } from '@prisma/client'
import { Request } from 'express'

import { jwtPromise } from '../utils/jwtPromise'
import { Errors } from '../data/Errors'
import { ReviewJSON, ReviewList } from '../types/ReviewJSON'
import { validation } from '../validations/review.validation'
import { createReview, deleteReview, findReviewById, findReviews, updateReview } from '../services/review.service'

const addReview = async (args: ReviewJSON, { req }: { req: Request }) => {
    let result: ReviewJSON = { error: '', movieId: -1, userId: -1, rating: -1, comment: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            validation(args)
            if (typeof id === 'number') {
                const review = await createReview(id, args)
                result = { error: '', ...review }
            } else {
                result.error = 'something went wrong'
            }
        } catch (err) {
            if (err) {
                if (err instanceof Errors) {
                    result = { userId: -1, movieId: -1, rating: -1, ...err.getReviewErrors() }
                } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        result.error = 'review already exits'
                    }
                    if (err.code === 'P2003') {
                        result.error = 'movie does not exist'
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

const updateReviewData = async (args: Review, { req }: { req: Request }) => {
    let result: ReviewJSON = { error: '', movieId: -1, userId: -1, rating: -1, comment: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            let review = await findReviewById(args.id)
            if (review) {
                if (review.userId === id) {
                    if (args.rating > 0 && args.rating < 6) {
                        review.rating = args.rating
                    }
                    if (args.comment !== '') {
                        review.comment = args.comment
                    }
                    review = await updateReview(review)
                    if (review) {
                        result = { error: '', ...review }
                    } else {
                        result.error = 'something went wrong'
                    }
                } else {
                    result.error = 'not allowed to update review'
                }
            } else {
                result.error = 'please provide correct review id'
            }
        } catch (err) {
            if (err) {
                console.log(err)
                if (err instanceof Errors) {
                    result = { movieId: -1, userId: -1, rating: -1, ...err.getReviewErrors() }
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

const removeReview = async (id: number, { req }: { req: Request }) => {
    let result: ReviewJSON = { error: '', movieId: -1, userId: -1, rating: -1, comment: '' }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const userId = await jwtPromise(token)
            let review = await findReviewById(id)
            if (review) {
                if (userId === review.userId) {
                    review = await deleteReview(id)
                    result = { error: '', ...review }
                } else {
                    result.error = 'not allowed to delete review'
                }
            } else {
                result.error = 'please provide correct review id'
            }
        } catch (err) {
            if (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') {
                        result.error = 'please provide correct review id'
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

const searchReviews = async (query: string, entry: number, page: number, { req }: { req: Request }) => {
    let result: ReviewList = { error: '', reviews: [] }
    let token: string = req.cookies.jwt
    if (token) {
        try {
            const id = await jwtPromise(token)
            if (typeof id === 'number') {
                const reviews = await findReviews(query, entry, page)
                result.reviews = reviews
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

export { addReview, updateReviewData, removeReview, searchReviews }