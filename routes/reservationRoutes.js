<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { validateReservation } = require('../middlewares/validateReservation');

router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.post('/reservations', validateReservation, reservationController.createReservation);
router.put('/reservations/:id', validateReservation, reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
=======
// routes/reservationRoutes.js
import express from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

// Route pour récupérer toutes les réservations
router.get('/reservations', getAllReservations);

// Route pour récupérer une réservation par ID
router.get('/reservations/:id', getReservationById);

// Route pour créer une nouvelle réservation
router.post('/reservations', createReservation);

// Route pour mettre à jour une réservation
router.put('/reservations/:id', updateReservation);

// Route pour supprimer une réservation
router.delete('/reservations/:id', deleteReservation);

export default router;
>>>>>>> fallou
