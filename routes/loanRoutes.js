// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/loans', loanController.getAllLoans);
router.get('/loans/:id', loanController.getLoanById);
router.post('/loans', loanController.createLoan);
router.put('/loans/:id', loanController.updateLoan);
router.delete('/loans/:id', loanController.deleteLoan);

module.exports = router;
