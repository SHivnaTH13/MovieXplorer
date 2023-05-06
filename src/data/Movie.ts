import { MovieIDJSON } from "../types/MovieJSON"

export class Movie {
    movieData = { error: '', movies: [{ id: -1, title: '', description: '', director: '', releaseDate: '' }] }
    constructor() {
    }
    setError(error: string) {
        this.movieData.error = error
    }
    setMovies(movies: MovieIDJSON[]) {
        this.movieData.movies = movies
    }
    getError() {
        return this.movieData.error
    }
    getMovies() {
        return this.movieData.movies
    }
}