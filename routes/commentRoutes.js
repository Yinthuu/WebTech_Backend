const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/comments', commentController.createComment);

router.get('/comments/:id', commentController.getCommentById);

router.get('/comments', commentController.getAllComments);

router.patch('/comments/:id', commentController.updateComment);

router.delete('/comments/:id', commentController.deleteComment);

router.get('/comments/userproduct/:userId/:productId', commentController.getCommentByUserAndProduct);

router.get('/comments/product/:productId', commentController.getCommentsByProduct);

module.exports = router;
