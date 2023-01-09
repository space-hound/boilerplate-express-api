/**
 * Object Utilities
 */
export default class ObjectUtils {

    /**
     * Creates an object composed of the picked object properties.
     *
     * @param {Object} object
     * @param {string[]} keys
     * @returns {Object}
     */
    static pick = (object, keys) => {
        return keys.reduce((slag, key) => {
            /*
                Object.prototype.hasOwnProperty.call
                https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
            */
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                slag[key] = object[key];
            }

            return slag;
        }, {});
    };
}
