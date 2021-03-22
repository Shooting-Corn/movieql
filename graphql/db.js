
// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'movie-info.cjwpwdzcf09z.ap-northeast-2.rds.amazonaws.com',
  user: 'admin',
  database: 'movie_info',
  port:3306,
  password: 'shootingcorn',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: 'Amazon RDS',
    authPlugins: {
        mysql_clear_password: () => () =>
            signer.getAuthToken({
                region: 'ap-northeast-2c',
                hostname: 'movie-info.cjwpwdzcf09z.ap-northeast-2.rds.amazonaws.com',
                port: '3306',
                username: 'admin'
            })
    }
});

export const getMovies = async () => {
  const [movies] = await connection.query(
    'SELECT * FROM `Metadata` ORDER BY title');
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

export const getTimelines = async id => {
  const [timelines] = await connection.query(
    'SELECT * FROM `' + id + '`'
  );
  return timelines;
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
