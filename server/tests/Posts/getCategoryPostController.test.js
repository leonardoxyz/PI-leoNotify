const { getCategoryPost } = require('../../controllers/postControllers');
const Post = require('../../models/postModel');
const HttpError = require('../../models/errorModel');

jest.mock('../../models/postModel');

describe('getCategoryPost', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {
                category: 'Art',
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

    it('should return posts of the specified category successfully', async () => {
        const mockPosts = [
            { id: '1', title: 'Post 1', category: 'Art', createdAt: new Date() },
            { id: '2', title: 'Post 2', category: 'Art', createdAt: new Date() },
        ];

        jest.spyOn(Post, 'find').mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockPosts),
        });

        await getCategoryPost(req, res, next);

        expect(Post.find).toHaveBeenCalledWith({ category: 'Art' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should handle errors when fetching posts by category', async () => {
        const mockError = new Error('Error fetching posts');

        jest.spyOn(Post, 'find').mockReturnValue({
            sort: jest.fn().mockRejectedValue(mockError),
        });

        await getCategoryPost(req, res, next);

        expect(Post.find).toHaveBeenCalledWith({ category: 'Art' });
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });

    it('should return an empty array if no posts found', async () => {
        jest.spyOn(Post, 'find').mockReturnValue({
            sort: jest.fn().mockResolvedValue([]),
        });

        await getCategoryPost(req, res, next);

        expect(Post.find).toHaveBeenCalledWith({ category: 'Art' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });
});