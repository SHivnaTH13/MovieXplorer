import { Review } from '@prisma/client'

import { ExpressContext } from '../../types/ExpressContext'
import { signUp, login, passwd } from '../../controllers/auth.controller'
import { User } from '../../types/User'
import { Passwd } from '../../types/Passwd'
import { addMovie, removeMovieData, searchMovie, searchMovies, updateMovieData } from '../../controllers/movie.controller'
import { MovieIDJSON, MovieJSON } from '../../types/MovieJSON'
import { ReviewJSON } from '../../types/ReviewJSON'
import { addReview, searchReviews } from '../../controllers/review.controller'
import { updateReviewData } from '../../controllers/review.controller'
import { removeReview } from '../../controllers/review.controller'

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        searchMovies: async (_: undefined, { query, entry, page }: { query: string, entry: number, page: number }, context: ExpressContext) => {
            const result = await searchMovies(query, entry, page, context)
            return result
        },
        searchMovie: async (_: undefined, { id }: { id: number }, context: ExpressContext) => {
            const result = await searchMovie(id, context)
            return result
        },
        searchReviews: async (_: undefined, { query, entry, page }: { query: string, entry: number, page: number }, context: ExpressContext) => {
            const result = await searchReviews(query, entry, page, context)
            return result
        }
    },
    Mutation: {
        signUp: async (_: undefined, args: User, context: ExpressContext) => {
            const result = await signUp(args, context)
            return result
        },
        login: async (_: undefined, args: User, context: ExpressContext) => {
            const result = await login(args, context)
            return result
        },
        passwd: async (_: undefined, args: Passwd, context: ExpressContext) => {
            const result = await passwd(args, context)
            return result
        },
        addMovie: async (_: undefined, args: MovieJSON, context: ExpressContext) => {
            const result = await addMovie(args, context)
            return result
        },
        updateMovieData: async (_: undefined, { movieData }: { movieData: MovieIDJSON }, context: ExpressContext) => {
            const result = await updateMovieData(movieData, context)
            return result
        },
        removeMovieData: async (_: undefined, { id }: { id: number }, context: ExpressContext) => {
            const result = await removeMovieData(id, context)
            return result
        },
        addReview: async (_: undefined, args: ReviewJSON, context: ExpressContext) => {
            const result = await addReview(args, context)
            return result
        },
        updateReviewData: async (_: undefined, { reviewData }: { reviewData: Review }, context: ExpressContext) => {
            const result = await updateReviewData(reviewData, context)
            return result
        },
        removeReview: async (_: undefined, { id }: { id: number }, context: ExpressContext) => {
            const result = await removeReview(id, context)
            return result
        }
    }
}

export default resolvers