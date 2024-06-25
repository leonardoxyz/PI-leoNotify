const sinon = require('sinon');
const path = require('path');
const { v4: uuid } = require('uuid');
const { createPost } = require('../controllers/postControllers');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid')
}));

describe('createPost', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            files: {
                thumbnail: {
                    name: 'test-thumbnail.png',
                    size: 1000,
                    mv: jest.fn((path, cb) => cb(null)) // Mocking the mv function
                }
            },
            user: {
                id: '41241241221'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();
    });

    afterEach(() => {
        sinon.restore();
        jest.clearAllMocks();
    });

    it('should return an error if title, category, or description is missing', async () => {
        req.body = {
            category: 'Test Category',
            desc: 'Test Description'
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
            category: 'Test Category',
            desc: 'Test Description'
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
            category: 'Test Category',
            desc: 'Test Description'
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
            category: 'Test Category',
            desc: 'Test Description'
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
