import httpStatus from 'http-status';

import { AsyncUtils } from 'shared/utilities';

/**
 * Health Controller
 */
export default class HealthController {

    /**
     * Method: GET, POST
     *
     * Path: /api/health/
     */
    static healthCheck = AsyncUtils.asyncHandler(async (req, res) => {
        res.status(httpStatus.OK).send({
            message: 'Hello World',
        });
    });
}
