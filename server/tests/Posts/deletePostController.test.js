const { deletePost } = require('../../controllers/postControllers');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');
jest.mock('../../models/userModel');

describe('deletePost', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            user: { id: 'user1' },
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

    it('should delete the post successfully', async () => {
        const mockPost = {
            _id: '1',
            creator: 'user1',
            title: 'Title',
            category: 'Category',
            desc: 'Description',
        };
        Post.findById.mockResolvedValue(mockPost);

        Post.findByIdAndDelete.mockResolvedValue();

        const mockUser = {
            _id: 'user1',
            name: 'Test User',
            posts: ['1'],
            save: jest.fn().mockResolvedValue(),
        };
        User.findById.mockResolvedValue(mockUser);

        await deletePost(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('1');

        expect(Post.findByIdAndDelete).toHaveBeenCalledWith('1');

        expect(User.findById).toHaveBeenCalledWith('user1');

        expect(mockUser.posts).not.toContain('1');
        expect(mockUser.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted successfully' });

        expect(next).not.toHaveBeenCalled();
    });

    it('should return 404 if post not found', async () => {
        Post.findById.mockResolvedValue(null);

        await deletePost(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('1');

        expect(Post.findByIdAndDelete).not.toHaveBeenCalled();

        expect(User.findById).not.toHaveBeenCalled();
    });

    it('should return 403 if user is not the creator of the post', async () => {
        const mockPost = {
            _id: '1',
            creator: 'user2',
            title: 'Title',
            category: 'Category',
            desc: 'Description',
        };
        Post.findById.mockResolvedValue(mockPost);

        await deletePost(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('1');

        expect(Post.findByIdAndDelete).not.toHaveBeenCalled();

        expect(User.findById).not.toHaveBeenCalled();
    });
});
