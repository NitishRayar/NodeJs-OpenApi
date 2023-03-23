import express from 'express';
import {query} from 'express-validator';

import {getWeatherAndCountryInfo}  from '../controller/weatherController';

const router = express.Router();
const validateReq= query('city').exists().isString().matches(/^[A-Za-z\s]+$/).withMessage('City Name must be alphabetic value.');

// /weather/current => GET
/**
 * @swagger
 * /weather:
 *  get:
 *      summary: Current weather Report.
 *      description: This api used to get City weather report and respective country details.
 *      parameters:
 *          - in: query
 *            name: city
 *            required: true
 *            type: string
 *            description: Enter the City name
 *      responses:
 *          200:
 *              description: Json Response of weather Report.
 *						
 */
router.get('/weather',validateReq, getWeatherAndCountryInfo);

export default router;