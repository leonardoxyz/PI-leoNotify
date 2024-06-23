const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const router = Router()

const { registerUser, loginUser, getUser, getAuthors, changeAvatar, editUser } = require('../controllers/userControllers')

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/:id", getUser)
router.post("/change-avatar", authMiddleware, changeAvatar)
router.patch("/edit-user/:id", authMiddleware, editUser);

module.exports = router