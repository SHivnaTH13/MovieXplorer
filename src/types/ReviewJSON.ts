import { Review } from "@prisma/client"

export type ReviewJSON = {
    error: string
    movieId: number
    userId: number
    rating: number
    comment: string
}

export type ReviewError = {
    error: string
    comment: string
}

export type ReviewList = {
    error: string
    reviews: Review[]
}