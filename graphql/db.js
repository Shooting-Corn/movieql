
// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'movie_info',
  password: 'shootingcorn',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const getMovies = async () => {
  const [movies] = await connection.query(
    'SELECT * FROM `Metadata`');
  return movies;
};

export const getMovie = async id => {
  const [[movie]] = await connection.query(
    'SELECT * FROM `Metadata` WHERE id = "' + id + '"');
  return movie;
};

export const getSuggestions = id => {
  const filteredMovies = movies.filter(movie => movie.id === id);
  let movie = filteredMovies[0];
  return movie;
};

export const getTimeline = async id => {
  const [timeline] = await connection.query(
    'SELECT * FROM `' + id + '`'
  );
  return timeline;
};

export const deleteMovie = id => {
  const cleanedMovies = movies.filter(movie => movie.id !== id);
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};

export const addMovie = (name, score) => {
  const newMovie = {
    id: `${movies.length + 1}`,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie;
};
