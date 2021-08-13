const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // Routes
  router.get('/', getMovies);
  router.get('/:movieId', getMovie);
  router.post('/', createMovie);
  router.put('/:movieId', updateMovie);
  router.delete('/:movieId', deleteMovie);

  // Functions
  async function getMovies(req, res, next) {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  }

  async function getMovie(req, res, next) {
    const { movieId } = req.params;
    try {
      const movie = await moviesService.getMovie({ movieId });

      res.status(200).json({
        data: movie,
        message: 'movie retrieved',
      });
    } catch (err) {
      next(err);
    }
  }

  async function createMovie(req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created',
      });
    } catch (err) {
      next(err);
    }
  }

  async function updateMovie(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovie = await moviesService.updateMovie({ movieId, movie });

      res.status(200).json({
        data: updatedMovie,
        message: 'movie updated',
      });
    } catch (err) {
      next(err);
    }
  }

  async function deleteMovie(req, res, next) {
    const { movieId } = req.params;
    try {
      const deletedMovie = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovie,
        message: 'movie deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = moviesApi;
