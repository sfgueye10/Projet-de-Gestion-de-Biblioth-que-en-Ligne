// routes/authorRoutes.js
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.createAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;
=======
import express from 'express';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authorController.js';

const router = express.Router();

router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorById);
router.post('/authors', createAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor);

export default router;
>>>>>>> fallou
