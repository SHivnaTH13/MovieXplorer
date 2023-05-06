// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    searchMovies(query: String!, entry: Int!, page: Int!): MovieList
    searchMovie(id: Int!): Movie
    searchReviews(query: String!, entry: Int!, page: Int!): ReviewList
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    passwd(oldPassword: String!, newPassword: String!): Password
    addMovie(title: String!, description: String!, director: String!, releaseDate: String!): Movie
    updateMovieData(movieData: MovieData!): Movie
    removeMovieData(id: Int!): Movie
    addReview(movieId: Int!, rating: Float!, comment: String!): Review
    updateReviewData(reviewData: ReviewData!): Review
    removeReview(id: Int!): Review
  }

  type User {
    errors: UserErrors
    id: Int
    username: String
    email: String
    password: String
  }

  type UserErrors {
    username: String
    email: String
    password: String
  }

  type Movie {
    error: String
    id: Int
    userId: Int
    title: String
    description: String
    director: String
    releaseDate: String
  }

  type Review {
    error: String
    id: Int
    movie: Movie
    movieId: Int
    user: User
    userId: Int
    rating: Float
    comment: String
  }

  type Password {
    token: String
    password: String
  }

  type MovieList {
    error: String
    movies: [Movie]
  }

  type ReviewList {
    error: String
    reviews: [Review]
  }

  input MovieData {
    id: Int!
    title: String
    description: String
    director: String
    releaseDate: String
  }

  input ReviewData {
    id: Int!
    rating: Float
    comment: String
  }
`

export default typeDefs