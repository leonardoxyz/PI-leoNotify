const {deleteComment} = require('../../controllers/commentControllers');
const Post = require('../../models/postModel'); 
const User = require('../../models/userModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');
jest.mock('../../models/userModel');

describe('deleteComment', () => {

    it('should delete comment successfully', async () => {
        const mockPostId = 'postId';
        const mockCommentId = 'commentId';
        const mockUserId = 'userId';

        Post.findById.mockResolvedValueOnce({
            _id: mockPostId,
            comments: [
                { _id: mockCommentId, author: mockUserId }
            ],
            save: jest.fn()
        });

        User.findById.mockResolvedValueOnce({
            _id: mockUserId,
            username: 'mockUsername'
        });

        const mockReq = {
            params: {
                postId: mockPostId,
                commentId: mockCommentId
            },
            user: {
                id: mockUserId
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockNext = jest.fn();

        await deleteComment(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return error if post isnt found', async () => {
        Post.findById.mockResolvedValueOnce(null);

        const mockReq = {
            params: {
                postId: 'postId',
                commentId: 'commentId'
            }
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockNext = jest.fn();

        await deleteComment(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = mockNext.mock.calls[0][0];
        expect(errorInstance.message).toBe('Post not found');
        expect(errorInstance.statusCode).toBe(404);
    });
});
