const { Router } = require('express');
const { createComment, deleteComment } = require('../controllers/CommentControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.post('/:id/comments', authMiddleware, createComment);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;