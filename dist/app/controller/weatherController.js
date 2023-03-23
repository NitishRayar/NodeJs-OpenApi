"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherAndCountryInfo = void 0;
const weatherReportService_1 = require("../service/weatherReportService");
const countryInfoService_1 = require("../service/countryInfoService");
const responseHandler_1 = require("../handlers/responseHandler");
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../logger"));
const getWeatherAndCountryInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    const errors = (0, express_validator_1.validationResult)(req);
    console.log('validation error');
    console.log(errors);
    if (!errors.isEmpty()) {
        logger_1.default.error(errors.array()[0].msg);
        const err = {
            status: 422,
            message: errors.array()[0].msg
        };
        return next(err);
    }
    try {
        const weatherResponse = yield (0, weatherReportService_1.getCurrentWeather)(params.city);
        if (weatherResponse) {
            const countryResponse = yield (0, countryInfoService_1.getCountryInfo)(weatherResponse.location.country);
            if (countryResponse) {
                const result = (0, responseHandler_1.responseHandler)(weatherResponse, countryResponse);
                logger_1.default.info(JSON.stringify(result));
                res.status(200).json(result);
            }
        }
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        const err = {
            status: error.response.status,
            message: 'Invalid City Name'
        };
        return next(err);
    }
});
exports.getWeatherAndCountryInfo = getWeatherAndCountryInfo;
