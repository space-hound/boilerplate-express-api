import UserModel from './user.model';
import UserExceptions from './user.exceptions';

/**
 * User Service
 */
export default class UserService {

    /**
     * Get all users.
     *
     * @returns {Promise<UserModel[]>}
     */
    static getUsers = async () => {
        return UserModel.find().exec();
    };

    /**
     * Get user by id.
     *
     * @param {ObjectId} id
     *
     * @returns {Promise<UserModel>}
     */
    static getUserById = async (id) => {
        return UserModel.findById(id).exec();
    };

    /**
     * Get user by email.
     *
     * @param {string} email
     *
     * @returns {Promise<UserModel>}
     */
    static getUserByEmail = async (email) => {
        return UserModel.findOne({ email }).exec();
    };

    /**
     * Create a new user.
     *
     * @param {Object} data
     * @param {string} data.email
     * @param {string} data.password
     *
     * @returns {Promise<UserModel>}
     *
     * @throws {ApiError} - EMAIL_TAKEN
     */
    static createUser = async (data) => {
        const isEmailTaken = await UserModel.isEmailTaken(data.email);

        if (isEmailTaken) {
            throw UserExceptions.EMAIL_TAKEN();
        }

        return UserModel.create(data);
    };

    /**
     * Update the user with the given id.
     *
     * @param {ObjectId} userId
     * @param {Object} userData
     *
     * @returns {Promise<UserModel>}
     */
    static updateUserById = async (userId, userData) => {
        const user = await UserService.getUserById(userId);

        if (!user) {
            throw UserExceptions.USER_NOT_FOUND();
        }

        if (userData.email) {
            const isEmailTaken = await UserModel.isEmailTaken(userData.email, userId);

            if (isEmailTaken) {
                throw UserExceptions.EMAIL_TAKEN();
            }
        }

        Object.assign(user, userData);

        await user.save();

        return user;
    };

    /**
     * Deletes the user with the given id.
     *
     * @param {ObjectId} userId
     *
     * @returns {Promise<UserModel>}
     */
    static deleteUserById = async (userId) => {
        const user = await UserService.getUserById(userId);

        if (!user) {
            throw UserExceptions.USER_NOT_FOUND();
        }

        await user.remove();

        return user;
    };

    /**
     * Update the user "isVerified" property to true.
     *
     * @param {ObjectId} userId
     *
     * @returns {Promise<UserModel>}
     */
    static modUserMarkVerified = async (userId) => {
        return UserService.updateUserById(userId, { isVerified: true });
    };

    /**
     * Changes the user "password" property to the given one.
     *
     * @param {ObjectId} userId
     * @param {string} password
     *
     * @returns {Promise<UserModel>}
     */
    static modUserChangePassword = async (userId, password) => {
        return UserService.updateUserById(userId, { password });
    };
}
