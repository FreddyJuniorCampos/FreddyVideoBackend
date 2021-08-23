const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schema/movies');
const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // Routes
  router.get('/', getMovies);
  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    getMovie
  );
  router.post('/', validationHandler(createMovieSchema), createMovie);
  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    updateMovie
  );
  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }),
    deleteMovie
  );

  // Functions
  async function getMovies(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      // throw new Error('Error getting movies');
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
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

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
