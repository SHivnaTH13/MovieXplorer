import { Review } from '@prisma/client'
import { prisma } from '../config/config'

export const createReview = async (userId: number, { movieId, rating, comment }: { movieId: number, rating: number, comment: string }) => {
    const review = await prisma.review.create({
        data: {
            movieId,
            userId,
            rating,
            comment
        }
    })
    return review
}

export const updateReview = async (reviewData: Review) => {
    const review = await prisma.review.update({
        where: {
            movieId_userId: { movieId: reviewData.movieId, userId: reviewData.userId }
        },
        data: {
            ...reviewData
        },
        include: {
            user: {
                select: {
                    username: true
                }
            },
            movie: true
        }
    })
    return review
}

export const deleteReview = async (id: number) => {
    const review = await prisma.review.delete({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    username: true
                }
            },
            movie: true
        }
    })
    return review
}

export const findReviewById = async (id: number) => {
    const review = await prisma.review.findUnique({
        where: {
            id
        }
    })
    return review
}

export const findReviews = async (query: string, entry: number, page: number) => {
    const review = await prisma.review.findMany({
        where: {
            comment: {
                contains: query
            }
        },
        orderBy: {
            rating: "desc"
        },
        take: entry,
        skip: page,
        include: {
            user: {
                select: {
                    username: true
                }
            },
            movie: true
        },
    })
    return review
}