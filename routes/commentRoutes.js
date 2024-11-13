// routes/commentRoutes.js
import express from 'express';
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

// Route pour récupérer tous les commentaires
router.get('/comments', getAllComments);

// Route pour récupérer un commentaire par ID
router.get('/comments/:id', getCommentById);

// Route pour créer un nouveau commentaire
router.post('/comments', createComment);

// Route pour mettre à jour un commentaire
router.put('/comments/:id', updateComment);

// Route pour supprimer un commentaire
router.delete('/comments/:id', deleteComment);

export default router;
