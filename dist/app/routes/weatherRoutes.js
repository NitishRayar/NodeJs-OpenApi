"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const weatherController_1 = require("../controller/weatherController");
const router = express_1.default.Router();
const validateReq = (0, express_validator_1.query)('city').exists().isString().matches(/^[A-Za-z\s]+$/).withMessage('City Name must be alphabetic value.');
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
router.get('/weather', validateReq, weatherController_1.getWeatherAndCountryInfo);
exports.default = router;
