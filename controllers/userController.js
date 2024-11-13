import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import db from '../models/index.js';
const User = db.User;

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Créer un nouvel utilisateur
export const createUser = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('email').isEmail().withMessage('L\'email est invalide'),
  check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  check('roleID').isInt().withMessage('L\'ID du rôle doit être un entier'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, roleID } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, roleID });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  }
];

// Mettre à jour un utilisateur
export const updateUser = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('email').isEmail().withMessage('L\'email est invalide'),
  check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  check('roleID').isInt().withMessage('L\'ID du rôle doit être un entier'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, roleID } = req.body;
      const user = await User.findByPk(req.params.id);
      if (user) {
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.roleID = roleID;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  }
];

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};
