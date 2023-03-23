import request from "supertest";
import app from '../../app/app';
import  {getCountryInfo} from '../../app/service/countryInfoService'
import {getCurrentWeather} from '../../app/service/weatherReportService'
import {responseHandler} from '../../app/handlers/responseHandler'
import countryData from '../data/countryData.json'
import weatherData from '../data/weatherData.json'
import responseData from '../data/responseData.json'
import { Error } from "../../app/models/error";
jest.mock('../../app/service/countryInfoService',()=>({
  getCountryInfo: jest.fn()
}));
jest.mock('../../app/service/weatherReportService',()=>({
  getCurrentWeather: jest.fn()
}));
jest.mock('../../app/handlers/responseHandler',()=>({
  responseHandler: jest.fn()
}));

const mockedCountryInfo = getCountryInfo as jest.Mock
const mockedCurrentWeather = getCurrentWeather as jest.Mock
const mockedResponseHandler = responseHandler as jest.Mock

describe('currentWeather',()=>{
    
  
  afterEach(() => {
    jest.clearAllMocks();
});
    
    describe("when API call is successful", () => {
        it("should return weather report", async () => {
          mockedCountryInfo.mockResolvedValue(countryData);
          mockedCurrentWeather.mockResolvedValue(weatherData);
          mockedResponseHandler.mockResolvedValue(responseData);
          const result = await request(app).get('/weather?city=hubli');

          expect(result.statusCode).toEqual(200);
          expect(mockedCountryInfo).toBeCalledTimes(1);
          expect(mockedCurrentWeather).toBeCalledTimes(1);
          expect(mockedResponseHandler).toBeCalledTimes(1);
        });
    });
    
    describe("when API call fails", () => {
        it("Invaid Request Params", async () => {
        
          const result = await request(app).get('/weather?city=hubli000');

          expect(result.statusCode).toEqual(422);
          expect(mockedCountryInfo).toBeCalledTimes(0);
          expect(mockedCurrentWeather).toBeCalledTimes(0);
          expect(mockedResponseHandler).toBeCalledTimes(0);
        })

        it("Invalid City Name", async () => {
          
          const err ={
            response:{
              status:400
            }
          }
      
          mockedCurrentWeather.mockRejectedValueOnce(err)
          const result = await request(app).get('/weather?city=ppp');

          expect(result.statusCode).toEqual(400);
          // expect(mockedCurrentWeather).toBeCalledTimes(0);
         
        })
            
    });
    
})