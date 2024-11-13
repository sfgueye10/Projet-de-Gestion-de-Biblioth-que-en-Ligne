// routes/genreRoutes.js
import express from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../controllers/genreController.js';

const router = express.Router();

// Route pour récupérer tous les genres
router.get('/genres', getAllGenres);

// Route pour récupérer un genre par ID
router.get('/genres/:id', getGenreById);

// Route pour créer un nouveau genre
router.post('/genres', createGenre);

// Route pour mettre à jour un genre
router.put('/genres/:id', updateGenre);

// Route pour supprimer un genre
router.delete('/genres/:id', deleteGenre);

export default router;
