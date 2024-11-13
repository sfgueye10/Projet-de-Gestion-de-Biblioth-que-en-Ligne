<<<<<<< HEAD
// controllers/genreController.js
const Genre = require('../models/Genre');
const { validationResult } = require('express-validator');

exports.getAllGenres = async (req, res) => {
  const { page = 1, limit = 10, name } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`
    };
  }

  try {
    const genres = await Genre.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: genres.count,
      pages: Math.ceil(genres.count / limit),
      data: genres.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGenreById = async (req, res) => {
=======
import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Genre = db.Genre;

// Récupérer tous les genres
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des genres' });
  }
};

// Récupérer un genre par ID
export const getGenreById = async (req, res) => {
>>>>>>> fallou
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGenre = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGenre = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.update(req.body);
      res.json(genre);
    } else {
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGenre = async (req, res) => {
=======
      res.status(404).json({ error: 'Genre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du genre' });
  }
};

// Créer un nouveau genre
export const createGenre = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const newGenre = await Genre.create({ name, description });
      res.status(201).json(newGenre);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du genre' });
    }
  }
];

// Mettre à jour un genre
export const updateGenre = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const genre = await Genre.findByPk(req.params.id);
      if (genre) {
        genre.name = name;
        genre.description = description;
        await genre.save();
        res.json(genre);
      } else {
        res.status(404).json({ error: 'Genre non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du genre' });
    }
  }
];

// Supprimer un genre
export const deleteGenre = async (req, res) => {
>>>>>>> fallou
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Genre supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Genre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du genre' });
>>>>>>> fallou
  }
};
