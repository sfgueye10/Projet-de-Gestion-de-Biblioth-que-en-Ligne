const { body, validationResult } = require('express-validator');

exports.validateReservation = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('reservationDate').isISO8601().withMessage('Reservation date must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
