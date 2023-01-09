import express from 'express';

import HealthController from './health.controller';

const HealthRouter = express.Router();

/**
 * Method: GET
 * Path: /api/health
 */
HealthRouter.get('/', HealthController.healthCheck);

/**
 * Method: POST
 * Path: /api/health
 */
HealthRouter.post('/', HealthController.healthCheck);

export default HealthRouter;
