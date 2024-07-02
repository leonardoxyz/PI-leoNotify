const { editPost } = require('../../controllers/postControllers');
const Post = require('../../models/postModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');

describe('editPost', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            user: { id: 'user1' },
            body: {
                title: 'Updated Title',
                category: 'Updated Category',
                desc: 'Updated Description',
            },
            files: {
                thumbnail: {
                    name: 'thumbnail.png',
                    size: 1000,
                    mv: jest.fn((path, cb) => cb(null)),
                },
            },
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

    it('should return an error if post not found', async () => {
        Post.findById.mockResolvedValue(null);

        await editPost(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].message).toBe('Post not found');
    });

    it('should return an error if user is not authorized', async () => {
        const mockPost = { creator: 'otherUserId', title: 'Title', category: 'Category', desc: 'Description' };
        Post.findById.mockResolvedValue(mockPost);

        await editPost(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].message).toBe('You are not authorized to edit this post');
    });

    it('should return an error if title, category, or description is missing', async () => {
        req.body = { category: 'Category', desc: 'Description' };
        const mockPost = { creator: 'user1', title: 'Title', category: 'Category', desc: 'Description' };
        Post.findById.mockResolvedValue(mockPost);

        await editPost(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].message).toBe('Title, category, and description are required');
    });

    it('should return an error if thumbnail size is greater than 2MB', async () => {
        req.files.thumbnail.size = 3000000;
        const mockPost = { creator: 'user1', title: 'Title', category: 'General', desc: 'Description' };
        Post.findById.mockResolvedValue(mockPost);

        await editPost(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].message).toBe('Thumbnail size should be less than 2MB');
    });

    it('should return an error if updating the post fails', async () => {
        const mockPost = {
            creator: 'user1',
            title: 'Title',
            category: 'Art',
            desc: 'Description',
            thumbnail: 'art-1719103922977.jpeg',
        };
        Post.findById.mockResolvedValue(mockPost);
        Post.findByIdAndUpdate.mockResolvedValue(null);

        await editPost(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        expect(next.mock.calls[0][0].message).toBe('Editing post failed, please try again');
    });
});