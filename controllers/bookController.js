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
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
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
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.json({ message: 'Livre supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Livre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du livre' });
  }
};
