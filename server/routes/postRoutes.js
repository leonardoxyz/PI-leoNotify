const { Router } = require('express');
const { createPost, getPosts, getPost, editPost, deletePost, getCategoryPost } = require('../controllers/postControllers')
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')
const commentRoutes = require('./commentRoutes')
const { createComment, deleteComment } = require('../controllers/commentControllers')

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/categories/:category", getCategoryPost);

router.post('/:id/comments', authMiddleware, createComment);
router.delete('/:postId/comments/:commentId', authMiddleware, deleteComment);

module.exports = router