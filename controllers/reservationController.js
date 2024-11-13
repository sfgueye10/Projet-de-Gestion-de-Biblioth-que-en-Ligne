<<<<<<< HEAD
// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const { validationResult } = require('express-validator');

exports.getAllReservations = async (req, res) => {
  const { page = 1, limit = 10, userId, bookId } = req.query;
  const offset = (page - 1) * limit;
  const where = {};

  if (userId) {
    where.UserId = userId;
  }

  if (bookId) {
    where.BookId = bookId;
  }

  try {
    const reservations = await Reservation.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: reservations.count,
      pages: Math.ceil(reservations.count / limit),
      data: reservations.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationById = async (req, res) => {
=======
import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Reservation = db.Reservation;

// Récupérer toutes les réservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};

// Récupérer une réservation par ID
export const getReservationById = async (req, res) => {
>>>>>>> fallou
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
<<<<<<< HEAD
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      await reservation.update(req.body);
      res.json(reservation);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
=======
      res.status(404).json({ error: 'Réservation non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la réservation' });
  }
};

// Créer une nouvelle réservation
export const createReservation = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('reservationDate').isISO8601().withMessage('La date de réservation doit être une date valide'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, reservationDate } = req.body;
      const newReservation = await Reservation.create({ userID, bookID, reservationDate });
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
    }
  }
];

// Mettre à jour une réservation
export const updateReservation = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('reservationDate').isISO8601().withMessage('La date de réservation doit être une date valide'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, reservationDate } = req.body;
      const reservation = await Reservation.findByPk(req.params.id);
      if (reservation) {
        reservation.userID = userID;
        reservation.bookID = bookID;
        reservation.reservationDate = reservationDate;
        await reservation.save();
        res.json(reservation);
      } else {
        res.status(404).json({ error: 'Réservation non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
    }
  }
];

// Supprimer une réservation
export const deleteReservation = async (req, res) => {
>>>>>>> fallou
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      await reservation.destroy();
<<<<<<< HEAD
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
=======
      res.json({ message: 'Réservation supprimée avec succès' });
    } else {
      res.status(404).json({ error: 'Réservation non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' });
>>>>>>> fallou
  }
};
