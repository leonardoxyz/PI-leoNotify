const { editUser } = require('../../controllers/userControllers');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const HttpError = require('../../models/errorModel');

jest.mock('bcryptjs');
jest.mock('../../models/userModel');

describe('editUser', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            user: { id: '1' },
            body: {}
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

    it('should update user successfully', async () => {
        const mockUser = {
            _id: '1',
            name: 'Test User',
            email: 'test@gmail.com',
            password: 'hashedPassword',
            avatar: 'avatar.jpg'
        };

        jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
        User.findByIdAndUpdate.mockResolvedValue({
            name: 'Updated User',
            email: 'test2@gmail.com',
            password: 'hashedPassword',
            avatar: 'avatar.jpg'
        });
    });

    it('should return an error if user is not found', async () => {
        User.findById.mockResolvedValue(null);
        await editUser(req, res, next);
        expect(User.findById).toHaveBeenCalledWith('1');
        expect(next).toHaveBeenCalledWith(expect.any(HttpError));
        const errorInstance = next.mock.calls[0][0];
        expect(errorInstance.message).toBe('User not found');
        expect(errorInstance.statusCode).toBe(404);
    });
});
