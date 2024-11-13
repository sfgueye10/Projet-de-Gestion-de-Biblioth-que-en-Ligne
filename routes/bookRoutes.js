// routes/bookRoutes.js
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
=======
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
>>>>>>> fallou
