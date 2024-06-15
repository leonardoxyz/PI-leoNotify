const { Router } = require('express');

const router = Router()

const { registerUser, loginUser, getUser, getAuthors, changeAvatar, editUser } = require('../controllers/userControllers')

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/:id", getUser)
router.get("/", getAuthors)
router.post("/change-avatar", changeAvatar)
router.patch("edit-user", editUser)

module.exports = router