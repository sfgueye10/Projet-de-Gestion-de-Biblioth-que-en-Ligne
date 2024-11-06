const { body, validationResult } = require('express-validator');

exports.validateComment = [
  body('content').notEmpty().withMessage('Content is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
