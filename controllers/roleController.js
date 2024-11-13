<<<<<<< HEAD
const Role = require('../models/Role');
const { validationResult } = require('express-validator');

exports.getAllRoles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const roles = await Role.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: roles.count,
      pages: Math.ceil(roles.count / limit),
      data: roles.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
=======
import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Role = db.Role;

// Récupérer tous les rôles
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
>>>>>>> fallou
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.json(role);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      await role.update(req.body);
      res.json(role);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
=======
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
>>>>>>> fallou
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      await role.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Rôle supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Rôle non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du rôle' });
>>>>>>> fallou
  }
};
