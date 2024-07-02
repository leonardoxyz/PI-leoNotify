const { getPosts, createPost, getPost, editPost } = require('../../controllers/postControllers');
const Post = require('../../models/postModel');
const HttpError = require('../../models/errorModel');
const path = require('path');
const fs = require('fs').promises;

jest.mock('../../models/postModel');
jest.mock('fs', () => ({
    promises: {
        unlink: jest.fn(),
    }
}));

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

    describe('Post Controller', () => {
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
    });
});