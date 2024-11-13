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
