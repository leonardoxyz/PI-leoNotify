const { getPosts, createPost } = require('../controllers/postControllers');
const { getPost } = require('../controllers/postControllers');
const Post = require('../models/postModel');
const HttpError = require('../models/errorModel');

jest.mock('../models/postModel');

describe('Post Controller', () => {
    describe('getPosts', () => {
        let req, res, next;

        beforeEach(() => {
            req = {};
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            next = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return the posts successfully', async () => {
            const mockPosts = [
                { id: '1', title: 'Post 1', updatedAt: new Date() },
                { id: '2', title: 'Post 2', updatedAt: new Date() },
            ];

            jest.spyOn(Post, 'find').mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockPosts),
            });

            await getPosts(req, res, next);

            expect(Post.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPosts);
        });

        it('should handle errors when fetching posts', async () => {
            const mockError = new Error('Error fetching posts');

            jest.spyOn(Post, 'find').mockReturnValue({
                sort: jest.fn().mockRejectedValue(mockError),
            });

            await getPosts(req, res, next);

            expect(Post.find).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        });

        it('should return the posts ordered by updatedAt in descending order', async () => {
            const mockPosts = [
                { id: '1', title: 'Post 1', updatedAt: new Date('2023-01-01') },
                { id: '2', title: 'Post 2', updatedAt: new Date('2023-02-01') },
            ];

            jest.spyOn(Post, 'find').mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockPosts),
            });

            await getPosts(req, res, next);

            expect(Post.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPosts);
        });
    });

    describe('createPost', () => {
        let req, res, next;
        beforeEach(() => {
            req = {
                body: {},
                files: {
                    thumbnail: {
                        name: 'test-thumbnail.png',
                        size: 1000,
                        mv: jest.fn((path, cb) => cb(null)),
                    },
                },
                user: {
                    id: '60d5ec49e47f8b21c8d4561b',
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

        it('should return an error if title, category, or description is missing', async () => {
            req.body = {
                category: 'Art',
                desc: 'Test Description',
            };

            await createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(HttpError));
            expect(next.mock.calls[0][0].message).toBe('Title, category, and description are required');
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should return an error if thumbnail is missing', async () => {
            req.body = {
                title: 'Test Post',
                category: 'Art',
                desc: 'Test Description',
            };
            delete req.files.thumbnail;

            await createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(HttpError));

            expect(next.mock.calls[0][0].message).toBe('Thumbnail is required');
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should return an error if thumbnail size is greater than 2MB', async () => {
            req.body = {
                title: 'Test Post',
                category: 'Art',
                desc: 'Test Description',
            };
            req.files.thumbnail.size = 3000000;

            await createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(HttpError));
            expect(next.mock.calls[0][0].message).toBe('Thumbnail size should be less than 2MB');
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should return an error if uploading thumbnail fails', async () => {
            req.body = {
                title: 'Test Post',
                category: 'General',
                desc: 'Test Description',
            };

            req.files.thumbnail.mv = jest.fn().mockImplementation((path, callback) => {
                callback(new Error('Unexpected error'));
            });

            await createPost(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(HttpError));
            expect(next.mock.calls[0][0].message).toBe('Uploading thumbnail failed');
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

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

    

});