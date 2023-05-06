import { Errors } from "../data/Errors"

export const validation = ({ rating, comment }: { rating: number, comment: string }) => {
    let errors = { error: '', comment: '' }
    const err = new Errors()
    if (rating < 0 || rating > 6) {
        errors.error = 'rating should be between 0 to 5'
        err.setReviewErrors(errors)
        throw err
    }
    if (comment === '') {
        errors.comment = 'please provide comment'
        err.setReviewErrors(errors)
        throw err
    }
}