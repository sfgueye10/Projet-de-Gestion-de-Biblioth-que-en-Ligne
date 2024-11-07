// middlewares/validateLoan.js
const { body, validationResult } = require('express-validator');

exports.validateLoan = [
  body('loanDate').isDate().withMessage('Loan date is invalid'),
  body('UserId').notEmpty().withMessage('User ID is required'),
  body('BookId').notEmpty().withMessage('Book ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
