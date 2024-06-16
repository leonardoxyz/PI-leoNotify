const e = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const HttpError = require("../models/errorModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const path = require("path")

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("All fields are required", 422))
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ email: newEmail })
        if (emailExists) {
            return next(new HttpError("Email already exists", 422))
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password must be at least 6 characters", 422))
        }

        if (password !== password2) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPassword
        })
        res.status(201).json(newUser);

    } catch (error) {
        return next(new HttpError("Registration failed, please try again", 422))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError("All fields are required", 422));
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const { _id, name } = user;
        const token = jwt.sign(
            { id: _id, name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token, id: _id, name });
    } catch (error) {
        console.error(error);
        return next(new HttpError("Login failed, please try again", 500));
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return next(new HttpError("User not found", 404));
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))
    }
}

const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files.avatar) {
            return next(new HttpError("Please upload an image", 422))
        }

        const user = await User.findById(req.user.id);

        if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, `../uploads/${user.avatar}`), (err) => {
                if (err) {
                    return next(new HttpError("Avatar not found", 404))
                }
            })
        }
        const { avatar } = req.files;
        if (avatar.size > 500000) {
            return next(new HttpError("Image size too large", 422))
        }

        let fileName;
        fileName = avatar.name;
        let splittedFilename = fileName.split(".");
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Image upload failed", 500))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });
            if (!updatedAvatar) {
                return next(new HttpError("Avatar update failed", 500))
            }
            res.status(200).json(updatedAvatar)
        })

    } catch (error) {
        return next(new HttpError(error))
    }
};

const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, newConfirmPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("All fields are required", 422))
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 404))
        }

        const emailExist = await User.findOne({ email });
        if (emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exists", 422))
        }

        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid password", 422))
        }

        if (newPassword !== newConfirmPassword) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: hash }, { new: true });
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new HttpError(error))
    }
}

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select("-password");
        res.json(authors)
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAuthors,
    changeAvatar,
    editUser
}