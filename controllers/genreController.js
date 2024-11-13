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
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
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
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.destroy();
      res.json({ message: 'Genre supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Genre non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du genre' });
  }
};
