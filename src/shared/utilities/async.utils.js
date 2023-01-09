/**
 * Async Utilities
 */
export default class AsyncUtils {

    /**
     * Takes in an express middleware function and wraps it with a promise catch
     *  in order to enable async/await syntax inside them. Express does not handle
     *  async errors by default.
     *
     * @param {function} handler
     * @returns {function}
     */
    static asyncHandler = (handler) => (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
