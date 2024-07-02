const { loginUser } = require('../../controllers/userControllers');
const User = require('../../models/userModel');
const HttpError = require('../../models/errorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('loginUser', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@gmail.com',
                password: 'password123'
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

    it('should return an error if any field is missing', async () => {
        req.body.email = '';
        await loginUser(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('All fields are required');
        expect(errorInstance.statusCode).toBe(422);
    });

    it('should return an error if email is not found', async () => {
        User.findOne.mockResolvedValue(null);
        await loginUser(req, res, next);
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('Invalid credentials');
        expect(errorInstance.statusCode).toBe(422);
    });

    it('should return an error if password is incorrect', async () => {
        const mockUser = { _id: '1', name: 'Test User', email: 'test@gmail.com', password: 'hashedPassword' };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);
        await loginUser(req, res, next);
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('Invalid credentials');
        expect(errorInstance.statusCode).toBe(422);
    });

    it('should log in a user successfully', async () => {
        const mockUser = { _id: '1', name: 'Test User', email: 'test@email.com', password: 'hashedPassword' };
        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('token');
        await loginUser(req, res, next);
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: '1', name: 'Test User' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'token', id: '1', name: 'Test User' });
    });

    it('should handle errors during login', async () => {
        const mockError = new Error('Database error');
        User.findOne.mockRejectedValue(mockError);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await loginUser(req, res, next);

        expect(console.error).toHaveBeenCalledWith(mockError);
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('Login failed, please try again');
        expect(errorInstance.statusCode).toBe(500);

        consoleErrorSpy.mockRestore();
    });
});