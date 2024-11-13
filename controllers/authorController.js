import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Author = db.Author;

// Récupérer tous les auteurs
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des auteurs' });
  }
};

// Récupérer un auteur par ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ error: 'Auteur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'auteur' });
  }
};

// Créer un nouvel auteur
export const createAuthor = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('bio').optional().isString().withMessage('La biographie doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, bio } = req.body;
      const newAuthor = await Author.create({ name, bio });
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'auteur' });
    }
  }
];

// Mettre à jour un auteur
export const updateAuthor = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('bio').optional().isString().withMessage('La biographie doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, bio } = req.body;
      const author = await Author.findByPk(req.params.id);
      if (author) {
        author.name = name;
        author.bio = bio;
        await author.save();
        res.json(author);
      } else {
        res.status(404).json({ error: 'Auteur non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'auteur' });
    }
  }
];

// Supprimer un auteur
export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      await author.destroy();
      res.json({ message: 'Auteur supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Auteur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'auteur' });
  }
};
