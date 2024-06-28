const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');
const Post = require('../models/postModel');
const User = require("../models/userModel");
const HttpError = require('../models/errorModel');

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               desc:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 category:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 thumbnail:
 *                   type: string
 *                 creator:
 *                   type: string
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
const createPost = async (req, res, next) => {
    try {
        let { title, category, desc } = req.body;
        if (!title || !category || !desc) {
            return next(new HttpError("Title, category, and description are required", 400));
        }

        const { thumbnail } = req.files;
        if (!thumbnail) {
            return next(new HttpError("Thumbnail is required", 400));
        }

        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail size should be less than 2MB", 400));
        }

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split(".");
        let newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[1]}`;

        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Uploading thumbnail failed", 500));
            } else {
                const newPost = await Post.create({
                    title,
                    category,
                    desc,
                    thumbnail: newFilename,
                    creator: req.user.id
                });

                if (!newPost) {
                    return next(new HttpError("Creating post failed, please try again", 500));
                }

                const currentUser = await User.findById(req.user.id);
                if (Array.isArray(currentUser.posts)) {
                    currentUser.posts.push(newPost._id);
                } else {
                    currentUser.posts = (currentUser.posts || 0) + 1;
                }
                await currentUser.save();

                res.status(201).json(newPost);
            }
        });

    } catch (error) {
        return next(new HttpError("Creating post failed, please try again", 500));
    }
};

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retorna todos os posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   category:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   thumbnail:
 *                     type: string
 *                   creator:
 *                     type: string
 *       500:
 *         description: Server error
 */
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error));
    }
};

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Return a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to be returned
 *     responses:
 *       200:
 *         description: Post returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 category:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 thumbnail:
 *                   type: string
 *                 creator:
 *                   type: string
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error));
    }
};

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post by post ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to be updated
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               desc:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 category:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 thumbnail:
 *                   type: string
 *                 creator:
 *                   type: string
 *       400:
 *         description: Title, category, and description are required
 *       401:
 *         description: You are not authorized to edit this post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
const editPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError('You are not authorized to edit this post', 401));
        }

        let { title, category, desc } = req.body;
        let thumbnail = req.body.thumbnail;

        if (!title || !category || !desc) {
            return next(new HttpError('Title, category, and description are required', 400));
        }

        if (req.files && req.files.thumbnail) {
            const newThumbnail = req.files.thumbnail;
            if (newThumbnail.size > 2000000) {
                return next(new HttpError('Thumbnail size should be less than 2MB', 400));
            }
            const fileName = newThumbnail.name;
            const splittedFilename = fileName.split('.');
            const newFilename = `${splittedFilename[0]}-${Date.now()}.${splittedFilename[1]}`;

            await newThumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));

            if (post.thumbnail) {
                try {
                    await fs.unlink(path.join(__dirname, '..', 'uploads', post.thumbnail));
                } catch (err) {
                    console.error('Error deleting old thumbnail:', err);
                }
            }

            thumbnail = newFilename;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, category, desc, thumbnail },
            { new: true }
        );

        if (!updatedPost) {
            return next(new HttpError('Post update failed, please try again', 500));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        return next(new HttpError('Editing post failed, please try again', 500));
    }
};

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by post ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to be deleted
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       401:
 *         description: You are not authorized to delete this post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        if (post.creator.toString() !== req.user.id) {
            return next(new HttpError("You are not authorized to delete this post", 401));
        }

        await Post.findByIdAndDelete(id);

        const currentUser = await User.findById(req.user.id);
        currentUser.posts = currentUser.posts.filter(p => p.toString() !== id);
        await currentUser.save();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return next(new HttpError(error))
    }
};

/**
 * @swagger
 * /api/posts/category/{category}:
 *   get:
 *     summary: Return posts by category
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category of the posts to be returned
 *     responses:
 *       200:
 *         description: List of posts found for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   category:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   thumbnail:
 *                     type: string
 *                   creator:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
const getCategoryPost = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error))
    }
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    editPost,
    deletePost,
    getCategoryPost
};