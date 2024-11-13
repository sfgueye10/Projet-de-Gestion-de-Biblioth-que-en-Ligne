// routes/bookRoutes.js
import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

// Route pour récupérer tous les livres
router.get('/books', getAllBooks);

// Route pour récupérer un livre par ID
router.get('/books/:id', getBookById);

// Route pour créer un nouveau livre
router.post('/books', createBook);

// Route pour mettre à jour un livre
router.put('/books/:id', updateBook);

// Route pour supprimer un livre
router.delete('/books/:id', deleteBook);

export default router;
