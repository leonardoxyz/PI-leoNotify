const { getPost } = require('../../controllers/postControllers');
const Post = require('../../models/postModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');

describe('getPost', () => {
    it('should get a post successfully', async () => {
        const mockPost = {
            id: '1',
            title: 'Test Post',
            category: 'Art',
            desc: 'Test Description',
            thumbnail: 'test-thumbnail.png',
            updatedAt: new Date(),
        };

        const req = {
            params: {
                id: '1',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(Post, 'findById').mockResolvedValue(mockPost);

        await getPost(req, res);

        expect(Post.findById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('should handle errors when fetching a post', async () => {
        const mockError = new Error('Error fetching post');

        const req = {
            params: {
                id: '1',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(Post, 'findById').mockRejectedValue(mockError);

        const next = jest.fn();

        await getPost(req, res, next);

        expect(Post.findById).toHaveBeenCalledWith('1');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });
});
