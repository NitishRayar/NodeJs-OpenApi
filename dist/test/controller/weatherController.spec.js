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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app/app"));
const countryInfoService_1 = require("../../app/service/countryInfoService");
const weatherReportService_1 = require("../../app/service/weatherReportService");
const responseHandler_1 = require("../../app/handlers/responseHandler");
const countryData_json_1 = __importDefault(require("../data/countryData.json"));
const weatherData_json_1 = __importDefault(require("../data/weatherData.json"));
const responseData_json_1 = __importDefault(require("../data/responseData.json"));
jest.mock('../../app/service/countryInfoService', () => ({
    getCountryInfo: jest.fn()
}));
jest.mock('../../app/service/weatherReportService', () => ({
    getCurrentWeather: jest.fn()
}));
jest.mock('../../app/handlers/responseHandler', () => ({
    responseHandler: jest.fn()
}));
const mockedCountryInfo = countryInfoService_1.getCountryInfo;
const mockedCurrentWeather = weatherReportService_1.getCurrentWeather;
const mockedResponseHandler = responseHandler_1.responseHandler;
describe('currentWeather', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("when API call is successful", () => {
        it("should return weather report", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedCountryInfo.mockResolvedValue(countryData_json_1.default);
            mockedCurrentWeather.mockResolvedValue(weatherData_json_1.default);
            mockedResponseHandler.mockResolvedValue(responseData_json_1.default);
            const result = yield (0, supertest_1.default)(app_1.default).get('/weather?city=hubli');
            expect(result.statusCode).toEqual(200);
            expect(mockedCountryInfo).toBeCalledTimes(1);
            expect(mockedCurrentWeather).toBeCalledTimes(1);
            expect(mockedResponseHandler).toBeCalledTimes(1);
        }));
    });
    describe("when API call fails", () => {
        it("Invaid Request Params", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertest_1.default)(app_1.default).get('/weather?city=hubli000');
            expect(result.statusCode).toEqual(422);
            expect(mockedCountryInfo).toBeCalledTimes(0);
            expect(mockedCurrentWeather).toBeCalledTimes(0);
            expect(mockedResponseHandler).toBeCalledTimes(0);
        }));
        // it("Invalid City Name", async () => {
        //   const err: Error ={
        //     status: 400,
        //     message: 'Invalid City Name'
        //    } 
        //   mockedCurrentWeather.mockRejectedValue(new Error('Invalid City Name'));
        //   const result = await request(app).get('/weather?city=ggggggg');
        //   expect(result.statusCode).toEqual(400);
        //   expect(mockedCountryInfo).toBeCalledTimes(0);
        //   expect(mockedCurrentWeather).toBeCalledTimes(0);
        //   expect(mockedResponseHandler).toBeCalledTimes(0);
        // })
    });
});
