/**
 * Password Validators.
 */
export default class PasswordValidator {

    /**
     * Validates a given password.
     *
     * @param {string} value
     * @returns {{value: string, error: ?string}}
     */
    static validate = (value) => {
        let error = null;

        if (value.length < 8) {
            error = 'Password must be at least 8 characters';
        }

        if (value.length > 32) {
            error = 'Password cannot be longer than 32 characters';
        }

        if (!value.match(/\d/)) {
            error = 'Password must contain at least 1 number';
        }

        if (!value.match(/[a-z]/)) {
            error = 'Password must contain at least 1 lowercase letter';
        }

        if (!value.match(/[A-Z]/)) {
            error = 'Password must contain at least 1 uppercase letter';
        }

        if (!value.match(/[!@#$%^&*()+=|;:]/)) {
            error = 'Password must contain at least 1 special symbol';
        }

        return { value, error };
    };

    /**
     * Validates a given password.
     * In the context of Joi.
     *
     * @param {string} value
     * @param {Object} helpers
     * @returns {string}
     */
    static validateJoi = (value, helpers) => {
        const validatedPassword = PasswordValidator.validate(value);

        if (validatedPassword.error) {
            return helpers.message(validatedPassword.error);
        }

        return validatedPassword.value;
    };
}
