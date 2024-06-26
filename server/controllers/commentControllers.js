const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Add a comment to a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to which the comment belongs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   text:
 *                     type: string
 *                   author:
 *                     type: string
 *                   authorName:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error on the server
 */
const createComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        const newComment = {
            text,
            author: req.user.id,
        };

        const authorUser = await User.findById(req.user.id);
        if (!authorUser) {
            return next(new HttpError('User not found', 404));
        }
        newComment.authorName = authorUser.username;

        post.comments.push(newComment);
        await post.save();

        res.status(201).json(post.comments);
    } catch (error) {
        return next(new HttpError('Creating comment failed, please try again', 500));
    }
};



/**
 * @swagger
 * /api/posts/{postId}/comments/{id}:
 *   delete:
 *     summary: Delete a comment from a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to which the comment belongs
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   text:
 *                     type: string
 *                   author:
 *                     type: string
 *                   authorName:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Post or comment not found
 *       500:
 *         description: Error on the server
 */
const deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);

        if (!comment) {
            return next(new HttpError('Comment not found', 404));
        }

        if (comment.author.toString() !== req.user.id) {
            return next(new HttpError('You are not authorized to delete this comment', 401));
        }

        const authorUser = await User.findById(comment.author);
        if (!authorUser) {
            return next(new HttpError('User not found', 404));
        }
        comment.authorName = authorUser.username;

        post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
        await post.save();

        res.status(200).json(post.comments);
    } catch (error) {
        return next(new HttpError('Deleting comment failed, please try again', 500));
    }
};


module.exports = {
    createComment,
    deleteComment,
};