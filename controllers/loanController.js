// controllers/loanController.js
const Loan = require('../models/Loan');
const { validationResult } = require('express-validator');

exports.getAllLoans = async (req, res) => {
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
    const loans = await Loan.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: loans.count,
      pages: Math.ceil(loans.count / limit),
      data: loans.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      await loan.update(req.body);
      res.json(loan);
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      await loan.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
