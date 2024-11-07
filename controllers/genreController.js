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
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
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
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Genre not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
