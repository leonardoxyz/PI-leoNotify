const { registerUser } = require('../../controllers/userControllers');
const User = require('../../models/userModel');
const HttpError = require('../../models/errorModel');
const bcrypt = require('bcryptjs');

jest.mock('../../models/userModel');
jest.mock('bcryptjs');

describe('registerUser', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                password2: 'password123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a user successfully', async () => {
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.create.mockResolvedValue({
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedPassword'
        });
        await registerUser(req, res, next);
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
        expect(User.create).toHaveBeenCalledWith({
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedPassword'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            user: {
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedPassword'
            }
        });
    });

    it('should handle validation errors', async () => {
        req.body.password2 = 'password';
        await registerUser(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError('Passwords do not match', 400));
    });

    it('should return email already exists error', async () => {
        User.findOne.mockResolvedValue(true);
        await registerUser(req, res, next);
        expect(next).toHaveBeenCalledWith(new HttpError('Email already exists', 400));
    });
});