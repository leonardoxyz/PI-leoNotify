const { createComment } = require('../../controllers/commentControllers');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');
jest.mock('../../models/userModel');

describe('createComment', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: { text: 'Test comment' },
            params: { id: 'postId' },
            user: { id: 'userId' },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a comment successfully', async () => {
        const mockPost = {
            id: 'postId',
            comments: [],
            save: jest.fn().mockResolvedValue(true),
        };
        const mockUser = {
            id: 'userId',
            username: 'testUser',
        };

        Post.findById.mockResolvedValue(mockPost);
        User.findById.mockResolvedValue(mockUser);

        await createComment(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('postId');
        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(mockPost.comments).toHaveLength(1);
        expect(mockPost.comments[0]).toEqual({
            text: 'Test comment',
            author: 'userId',
            authorName: 'testUser',
        });
        expect(mockPost.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockPost.comments);
    });

    it('should handle post not found error', async () => {
        Post.findById.mockResolvedValue(null);

        await createComment(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('postId');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('Post not found');
        expect(errorInstance.statusCode).toBe(404);
    });

    it('should handle user not found error', async () => {
        const mockPost = {
            id: 'postId',
            comments: [],
            save: jest.fn().mockResolvedValue(true),
        };

        Post.findById.mockResolvedValue(mockPost);
        User.findById.mockResolvedValue(null);

        await createComment(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('postId');
        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('User not found');
        expect(errorInstance.statusCode).toBe(404);
    });

    it('should handle errors during comment creation', async () => {
        const mockError = new Error('Database error');

        Post.findById.mockRejectedValue(mockError);

        await createComment(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('postId');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('Creating comment failed, please try again');
        expect(errorInstance.statusCode).toBe(500);
    });
});
