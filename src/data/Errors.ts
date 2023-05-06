import { MovieJSON } from "../types/MovieJSON";
import { ReviewError } from "../types/ReviewJSON";
import { User } from "../types/User";

export class Errors {
    authErrors = { username: '', email: '', password: '' }
    movieErrors = { title: '', description: '', director: '', releaseDate: '' }
    reviewErrors = { error: '', comment: '' }
    constructor() {
    }
    setAuthErrors(authErrors: User) {
        this.authErrors = authErrors
    }
    getAuthErrors() {
        return this.authErrors
    }
    setMovieErrors(movieErrors: MovieJSON) {
        this.movieErrors = movieErrors
    }
    getMovieErrors() {
        return this.movieErrors
    }
    setReviewErrors(reviewErrors: ReviewError) {
        this.reviewErrors = reviewErrors
    }
    getReviewErrors() {
        return this.reviewErrors
    }
}