const { Router } = require('express');
const { createPost, getPosts, getPost, getAuthorPost, editPost, deletePost } = require('../controllers/postControllers')
const router = Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/users/:id", getAuthorPost);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router