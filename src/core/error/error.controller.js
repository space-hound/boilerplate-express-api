import ErrorExceptions from './error.exceptions';

/**
 * Error Controller
 */
export default class ErrorController {

    /**
     * Handles all incoming unknown api requests.
     */
    static notFound = (req, res, next) => {
        next(ErrorExceptions.NOT_FOUND());
    };
}
