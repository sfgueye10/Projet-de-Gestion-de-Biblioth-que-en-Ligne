const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const { validateGenre } = require('../middlewares/validateGenre');

router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);
router.post('/genres', validateGenre, genreController.createGenre);
router.put('/genres/:id', validateGenre, genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;
