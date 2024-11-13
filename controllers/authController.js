import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.js';
const User = db.User;

const secretKey = process.env.JWT_SECRET || 'Falilou1';

// Inscription d'un nouvel utilisateur
export const register = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('email').isEmail().withMessage('L\'email est invalide'),
  check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
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
      res.status(500).json({ error: 'Erreur lors de l\'inscription de l\'utilisateur' });
    }
  }
];

// Connexion d'un utilisateur
export const login = [
  check('email').isEmail().withMessage('L\'email est invalide'),
  check('password').notEmpty().withMessage('Le mot de passe est requis'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
      }

      const token = jwt.sign({ id: user.id, email: user.email, roleID: user.roleID }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
  }
];
