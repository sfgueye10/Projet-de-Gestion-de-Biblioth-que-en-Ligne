
// middlewares/validateBook.js
const { body, validationResult } = require('express-validator');

exports.validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('publicationDate').isDate().withMessage('Publication date is invalid'),
  body('AuthorId').notEmpty().withMessage('Author ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
