// routes/userRoutes.js
import express from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', authenticateToken, getAllUsers);

// Route pour récupérer un utilisateur par ID
router.get('/users/:id', authenticateToken, getUserById);

// Route pour créer un nouvel utilisateur avec validations
router.post('/users', [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('roleID').isInt().withMessage('roleID doit être un entier')
], authenticateToken, createUser);

// Route pour mettre à jour un utilisateur avec validations
router.put('/users/:id', [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('roleID').isInt().withMessage('roleID doit être un entier')
], authenticateToken, updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
