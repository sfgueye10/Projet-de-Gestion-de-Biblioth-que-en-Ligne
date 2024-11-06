const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { validateComment } = require('../middlewares/validateComment');

router.get('/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/comments', validateComment, commentController.createComment);
router.put('/comments/:id', validateComment, commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
