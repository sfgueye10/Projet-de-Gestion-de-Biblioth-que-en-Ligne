// routes/loanRoutes.js
<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/loans', loanController.getAllLoans);
router.get('/loans/:id', loanController.getLoanById);
router.post('/loans', loanController.createLoan);
router.put('/loans/:id', loanController.updateLoan);
router.delete('/loans/:id', loanController.deleteLoan);

module.exports = router;
=======
import express from 'express';
import {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
} from '../controllers/loanController.js';

const router = express.Router();

// Route pour récupérer tous les prêts
router.get('/loans', getAllLoans);

// Route pour récupérer un prêt par ID
router.get('/loans/:id', getLoanById);

// Route pour créer un nouveau prêt
router.post('/loans', createLoan);

// Route pour mettre à jour un prêt
router.put('/loans/:id', updateLoan);

// Route pour supprimer un prêt
router.delete('/loans/:id', deleteLoan);

export default router;
>>>>>>> fallou
