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
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
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
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Commentaire supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
};
