const e = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const HttpError = require("../models/errorModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const path = require("path")

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               password2:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Error in sent data
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;

        if (!name || !email || !password) {
            throw new HttpError("All fields are required", 422);
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            throw new HttpError("Email already exists", 422);
        }

        if (password.trim().length < 6) {
            throw new HttpError("Password must be at least 6 characters", 422);
        }

        if (password !== password2) {
            throw new HttpError("Passwords do not match", 422);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPassword
        });

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        next(new HttpError(error.message || "Registration failed, please try again", error.status || 500));
    }
};

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Error in sent data
 *       422:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/users/change-avatar:
 *   post:
 *     summary: Change the avatar of the logged-in user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *       422:
 *         description: Error in sent data
 *       500:
 *         description: Server error
 */
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please upload an image", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (user.avatar) {
            fs.unlink(path.join(__dirname, `../uploads/${user.avatar}`), (err) => {
                if (err) {
                    console.error("Error deleting old avatar:", err);
                }
            });
        }

        const { avatar } = req.files;
        if (avatar.size > 500000) {
            return next(new HttpError("Image size too large", 422));
        }

        const fileNameParts = avatar.name.split(".");
        const newFilename = `${fileNameParts[0]}-${uuid()}.${fileNameParts[fileNameParts.length - 1]}`;

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Image upload failed", 500));
            }

            user.avatar = newFilename;
            await user.save();

            res.status(200).json(user);
        });

    } catch (error) {
        console.error("Error changing avatar:", error);
        return next(new HttpError("Internal Server Error", 500));
    }
};

/**
 * @swagger
 * /api/users/edit-user/{id}:
 *   patch:
 *     summary: Edit user information
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       422:
 *         description: Error in sent data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (email !== user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist && emailExist._id != req.user.id) {
                return next(new HttpError("Email already exists", 422));
            }
        }

        user.name = name;
        user.email = email;

        if (currentPassword && newPassword && confirmPassword) {
            const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
            if (!validateUserPassword) {
                return next(new HttpError("Invalid password", 422));
            }

            if (newPassword !== confirmPassword) {
                return next(new HttpError("Passwords do not match", 422));
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            user.password = hash;
        }

        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error editing user:", error);
        return next(new HttpError("Internal Server Error", 500));
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser
}