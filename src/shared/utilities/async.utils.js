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

    /**
     * Takes in an array of functions each returning a promise, and calls them
     *  sequentially, right after the previous was called and the promise returned
     *  has finished and its is resolved.
     *
     * @param {function[]} actions
     * @return {Promise<*>}
     */
    static queueAsyncActions = async (actions) => {
        return actions.reduce((accumulator, action) => {
            return accumulator.then((data) => action(data));
        }, Promise.resolve());
    };
}
