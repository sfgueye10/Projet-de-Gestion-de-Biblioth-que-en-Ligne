<<<<<<< HEAD
// controllers/bookController.js
const Book = require('../models/Book');
const { validationResult } = require('express-validator');

exports.getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, authorId, genre } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (authorId) {
    where.AuthorId = authorId;
  }

  if (genre) {
    where.genre = genre;
  }

  try {
    const books = await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: books.count,
      pages: Math.ceil(books.count / limit),
      data: books.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
=======
import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Book = db.Book;

// Récupérer tous les livres
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des livres' });
  }
};

// Récupérer un livre par ID
export const getBookById = async (req, res) => {
>>>>>>> fallou
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
=======
      res.status(404).json({ error: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du livre' });
  }
};

// Créer un nouveau livre
export const createBook = [
  check('title').notEmpty().withMessage('Le titre est requis'),
  check('authorID').isInt().withMessage('L\'ID de l\'auteur doit être un entier'),
  check('genreID').isInt().withMessage('L\'ID du genre doit être un entier'),
  check('publishedDate').isISO8601().withMessage('La date de publication doit être une date valide'),
  check('summary').optional().isString().withMessage('Le résumé doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, authorID, genreID, publishedDate, summary } = req.body;
      const newBook = await Book.create({ title, authorID, genreID, publishedDate, summary });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du livre' });
    }
  }
];

// Mettre à jour un livre
export const updateBook = [
  check('title').notEmpty().withMessage('Le titre est requis'),
  check('authorID').isInt().withMessage('L\'ID de l\'auteur doit être un entier'),
  check('genreID').isInt().withMessage('L\'ID du genre doit être un entier'),
  check('publishedDate').isISO8601().withMessage('La date de publication doit être une date valide'),
  check('summary').optional().isString().withMessage('Le résumé doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, authorID, genreID, publishedDate, summary } = req.body;
      const book = await Book.findByPk(req.params.id);
      if (book) {
        book.title = title;
        book.authorID = authorID;
        book.genreID = genreID;
        book.publishedDate = publishedDate;
        book.summary = summary;
        await book.save();
        res.json(book);
      } else {
        res.status(404).json({ error: 'Livre non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du livre' });
    }
  }
];

// Supprimer un livre
export const deleteBook = async (req, res) => {
>>>>>>> fallou
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Livre supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du livre' });
>>>>>>> fallou
  }
};
