const { createPost } = require('../controllers/postControllers');
const HttpError = require('../models/errorModel');

describe('createPost', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            files: {
                thumbnail: {
                    size: 1000000,
                    name: 'test.jpg'
                }
            },
            user: {
                id: 'leonardo'
            }
        };
        res = {};
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if title is not provided', async () => {
        await createPost(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError("Title, category, and description are required", 400));
    });

    test('should return 400 if category is not provided', async () => {
        req.body.title = 'Test Title';
        await createPost(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError("Title, category, and description are required", 400));
    });

    test('should return 400 if desc is not provided', async () => {
        req.body.title = 'Test Title';
        req.body.category = 'Test Category';
        await createPost(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError("Title, category, and description are required", 400));
    });

    test('should return 400 if thumbnail is not provided', async () => {
        req.body.title = 'Test Title';
        req.body.category = 'Test Category';
        req.body.desc = 'Test Description';
        req.files.thumbnail = null;
        await createPost(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError("Thumbnail is required", 400));
    });

    test('should return 400 if thumbnail size exceeds 2MB', async () => {
        req.body.title = 'Test Title';
        req.body.category = 'Test Category';
        req.body.desc = 'Test Description';
        req.files.thumbnail.size = 3000000;
        await createPost(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError("Thumbnail size should be less than 2MB", 400));
    });
});