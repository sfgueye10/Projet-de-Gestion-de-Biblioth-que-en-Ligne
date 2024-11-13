<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { validateRole } = require('../middlewares/validateRole');

router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', validateRole, roleController.createRole);
router.put('/roles/:id', validateRole, roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
=======
// routes/roleRoutes.js
import express from 'express';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roleController.js';

const router = express.Router();

// Route pour récupérer tous les rôles
router.get('/roles', getAllRoles);

// Route pour récupérer un rôle par ID
router.get('/roles/:id', getRoleById);

// Route pour créer un nouveau rôle
router.post('/roles', createRole);

// Route pour mettre à jour un rôle
router.put('/roles/:id', updateRole);

// Route pour supprimer un rôle
router.delete('/roles/:id', deleteRole);

export default router;
>>>>>>> fallou
