<<<<<<< HEAD
// controllers/authorController.js
const Author = require('../models/Author');
const { validationResult } = require('express-validator');

exports.getAllAuthors = async (req, res) => {
  const { page = 1, limit = 10, name } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`
    };
  }

  try {
    const authors = await Author.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: authors.count,
      pages: Math.ceil(authors.count / limit),
      data: authors.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAuthorById = async (req, res) => {
=======
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
>>>>>>> fallou
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.json(author);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      await author.update(req.body);
      res.json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAuthor = async (req, res) => {
=======
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
>>>>>>> fallou
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      await author.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Auteur supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Auteur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'auteur' });
>>>>>>> fallou
  }
};
