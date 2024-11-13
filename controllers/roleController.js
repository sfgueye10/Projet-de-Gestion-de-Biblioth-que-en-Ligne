import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Role = db.Role;

// Recupérer tous les rôles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des rôles' });
  }
};

// Récupérer un rôle par ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ error: 'Rôle non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du rôle' });
  }
};

// Créer un nouveau rôle
export const createRole = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const newRole = await Role.create({ name, description });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du rôle' });
    }
  }
];

// Mettre à jour un rôle
export const updateRole = [
  check('name').notEmpty().withMessage('Le nom est requis'),
  check('description').optional().isString().withMessage('La description doit être une chaîne de caractères'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description } = req.body;
      const role = await Role.findByPk(req.params.id);
      if (role) {
        role.name = name;
        role.description = description;
        await role.save();
        res.json(role);
      } else {
        res.status(404).json({ error: 'Rôle non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle' });
    }
  }
];

// Supprimer un rôle
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      await role.destroy();
      res.json({ message: 'Rôle supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Rôle non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
  }
};
