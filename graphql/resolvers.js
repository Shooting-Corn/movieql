import { getMovies, getMovie, getSuggestions, getTimeline } from "./db";

const resolvers = {
  Query: {
    movies: (_, { limit }) => getMovies(limit),
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
    timeline: (_, { id }) => getTimeline(id)
  }
};

export default resolvers;