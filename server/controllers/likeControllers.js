const Like = require('../models/Like');
const Post = require('../models/Post');

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *   post:
 *     summary: Adicionar um like a um post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       201:
 *         description: Like adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 post:
 *                   type: string
 *       400:
 *         description: O usuário já deu like neste post
 *       500:
 *         description: Erro interno do servidor
 */
const addLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        // Check if the like already exists
        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        // Create a new like
        const like = new Like({ user: userId, post: postId });
        await like.save();

        // Update the post to include the new like
        const post = await Post.findById(postId);
        post.likes.push(like._id);
        await post.save();

        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = { addLike };
