const fs = require('fs');
const { v4: uuid } = require('uuid');
const path = require('path');
const Post = require('../models/postModel');
const User = require("../models/userModel");
const HttpError = require('../models/errorModel');

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

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ ùpdateAt: -1 })
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error))
    }
};

const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError("Post not found", 404));
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error))
    }
};


const getAuthorPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error))
    }
};

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

module.exports = {
    createPost,
    getPosts,
    getPost,
    getAuthorPost,
    editPost,
    deletePost
};