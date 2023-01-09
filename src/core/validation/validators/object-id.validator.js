/**
 * ObjectId Validators.
 */
export default class ObjectIdValidator {

    /**
     * Validates a given object id.
     *
     * @param {string} value
     * @returns {{value: string, error: ?string}}
     */
    static validate = (value) => {
        let error = null;

        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
            error = `"${value}" must be a valid mongo id`;
        }

        return { value, error };
    };

    /**
     * Validates a given object id.
     * In the context of Joi.
     *
     * @param {string} value
     * @param {Object} helpers
     * @returns {string}
     */
    static validateJoi = (value, helpers) => {
        const validatedObjectId = ObjectIdValidator.validate(value);

        if (validatedObjectId.error) {
            return helpers.message(validatedObjectId.error);
        }

        return validatedObjectId.value;
    };
}
