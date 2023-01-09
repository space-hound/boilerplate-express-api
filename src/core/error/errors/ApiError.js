import BaseError from './BaseError';

/**
 * Generic API error class which extends BaseError.
 */
export default class ApiError extends BaseError {

    /**
     * Creates a new ApiError instance.
     *
     * @param {Object} props
     * @param {string} props.message
     * @param {number} props.statusCode
     * @param {string} [props.stack]
     * @param {boolean} [props.isOperational]
     */
    constructor(props) {
        super(props);
    }
}
