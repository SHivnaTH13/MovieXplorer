import isDate from 'validator/lib/isDate.js'
import { Errors } from '../data/Errors'

export const validation = ({ title, description, director, releaseDate }: { title: string, description: string, director: string, releaseDate: string }) => {
    let errors = { title: '', description: '', director: '', releaseDate: '' }
    const err = new Errors()
    if (title === '' || description === '' || director === '' || releaseDate === '') {
        if (title === '') {
            errors.title = 'please provide title'
        }
        if (description === '') {
            errors.description = 'please provide description'
        }
        if (director === '') {
            errors.director = 'please provide director'
        }
        if (releaseDate === '') {
            errors.releaseDate = 'please provide releaseDate'
        }
        err.setMovieErrors(errors)
        throw err
    }
    if (releaseDate) {
        if (!isDate(releaseDate)) {
            errors.releaseDate = 'please provide valid date'
            err.setMovieErrors(errors)
            throw err
        }
    }
}