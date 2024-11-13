<<<<<<< HEAD
// controllers/commentController.js
const Comment = require('../models/Comment');
const { validationResult } = require('express-validator');

exports.getAllComments = async (req, res) => {
  const { page = 1, limit = 10, userId, bookId } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (userId) {
    where.UserId = userId;
  }

  if (bookId) {
    where.BookId = bookId;
  }

  try {
    const comments = await Comment.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: comments.count,
      pages: Math.ceil(comments.count / limit),
      data: comments.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
=======
import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Comment = db.Comment;

// Récupérer tous les commentaires
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};

// Récupérer un commentaire par ID
export const getCommentById = async (req, res) => {
>>>>>>> fallou
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.update(req.body);
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
=======
      res.status(404).json({ error: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du commentaire' });
  }
};

// Créer un nouveau commentaire
export const createComment = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('content').notEmpty().withMessage('Le contenu est requis'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, content } = req.body;
      const newComment = await Comment.create({ userID, bookID, content });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
    }
  }
];

// Mettre à jour un commentaire
export const updateComment = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('content').notEmpty().withMessage('Le contenu est requis'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, content } = req.body;
      const comment = await Comment.findByPk(req.params.id);
      if (comment) {
        comment.userID = userID;
        comment.bookID = bookID;
        comment.content = content;
        await comment.save();
        res.json(comment);
      } else {
        res.status(404).json({ error: 'Commentaire non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du commentaire' });
    }
  }
];

// Supprimer un commentaire
export const deleteComment = async (req, res) => {
>>>>>>> fallou
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Commentaire supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
>>>>>>> fallou
  }
};
