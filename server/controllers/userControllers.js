const e = require("express")

const registerUser = (req, res, next) => {
    res.json("User registered")
}

const loginUser = (req, res, next) => {
    res.json("User logged in")
}

const getUser = (req, res, next) => {
    res.json("User profile")
}

const changeAvatar = (req, res, next) => {
    res.json("Avatar changed")
}

const editUser = (req, res, next) => {
    res.json("User edited")
}

const getAuthors = (req, res, next) => {
    res.json("Authors")
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAuthors,
    changeAvatar,
    editUser
}