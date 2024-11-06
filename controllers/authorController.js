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
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.json(author);
    } else {
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
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      await author.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
