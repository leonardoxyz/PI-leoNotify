const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Adicionar um comentário a um post específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post ao qual o comentário será adicionado
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
 *         description: Comentário adicionado com sucesso
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
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro no servidor
 */
const createComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { id } = req.params; // id do post

        const post = await Post.findById(id);

        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        const newComment = {
            text,
            author: req.user.id,
        };

        // Adicionar o nome do autor ao novo comentário
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
 * /api/posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Deletar um comentário de um post específico
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post ao qual o comentário pertence
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário a ser deletado
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
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
 *         description: Não autorizado a deletar o comentário
 *       404:
 *         description: Post ou comentário não encontrado
 *       500:
 *         description: Erro no servidor
 */
const deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params; // postId e commentId
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

        // Remover o nome do autor do comentário antes de deletar
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