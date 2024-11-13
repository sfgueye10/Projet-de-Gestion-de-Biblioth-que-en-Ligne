import { check, validationResult } from 'express-validator';
import db from '../models/index.js'; 
const Loan = db.Loan;

// Récupérer tous les prêts
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des prêts' });
  }
};

// Récupérer un prêt par ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ error: 'Prêt non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du prêt' });
  }
};

// Créer un nouveau prêt
export const createLoan = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('loanDate').isISO8601().withMessage('La date de prêt doit être une date valide'),
  check('returnDate').optional().isISO8601().withMessage('La date de retour doit être une date valide'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, loanDate, returnDate } = req.body;
      const newLoan = await Loan.create({ userID, bookID, loanDate, returnDate });
      res.status(201).json(newLoan);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du prêt' });
    }
  }
];

// Mettre à jour un prêt
export const updateLoan = [
  check('userID').isInt().withMessage('L\'ID de l\'utilisateur doit être un entier'),
  check('bookID').isInt().withMessage('L\'ID du livre doit être un entier'),
  check('loanDate').isISO8601().withMessage('La date de prêt doit être une date valide'),
  check('returnDate').optional().isISO8601().withMessage('La date de retour doit être une date valide'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userID, bookID, loanDate, returnDate } = req.body;
      const loan = await Loan.findByPk(req.params.id);
      if (loan) {
        loan.userID = userID;
        loan.bookID = bookID;
        loan.loanDate = loanDate;
        loan.returnDate = returnDate;
        await loan.save();
        res.json(loan);
      } else {
        res.status(404).json({ error: 'Prêt non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du prêt' });
    }
  }
];

// Supprimer un prêt
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      await loan.destroy();
      res.json({ message: 'Prêt supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Prêt non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du prêt' });
  }
};
