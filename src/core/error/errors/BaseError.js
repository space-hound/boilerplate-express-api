/**
 * Base error class to be used for extending other error types.
 */
export default class BaseError extends Error {

    /**
     * Creates a new BaseError instance.
     *
     * @param {Object} props
     * @param {string} props.message
     * @param {number} props.statusCode
     * @param {string} [props.stack]
     * @param {boolean} [props.isOperational]
     */
    constructor(props) {
        const {
            message,
            stack = '',
            statusCode,
            isOperational = true,
        } = props;

        super(message);

        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
