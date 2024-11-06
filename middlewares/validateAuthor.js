// middlewares/validateAuthor.js
const { body, validationResult } = require('express-validator');

exports.validateAuthor = [
  body('name').notEmpty().withMessage('Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
