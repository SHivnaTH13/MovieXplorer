export type MovieJSON = {
    title: string
    description: string
    director: string
    releaseDate: string
}

export type MovieIDJSON = {
    id: number
    userId: number
    title: string
    description: string
    director: string
    releaseDate: string
}

export type MovieList = {
    error: string
    movies: MovieIDJSON[]
}