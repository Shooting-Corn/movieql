import { getMovies, getMovie, getSuggestions, getTimelines } from "./db";

const resolvers = {
  Query: {
    movies: (_, { limit }) => getMovies(limit),
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
    timelines: (_, { id }) => getTimelines(id)
  }
};

export default resolvers;