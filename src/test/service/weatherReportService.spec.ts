import axios from 'axios';
import weatherData from '../data/weatherData.json'
import {getCurrentWeather} from '../../app/service/weatherReportService'


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios call to get Country info',()=>{
    test('getCountryInfo', ()=>{
        const result ={
            data:weatherData
        }
        mockedAxios.get.mockResolvedValue(result);
        getCurrentWeather("hubli").then((data)=>{
            expect(data?.location.country).toEqual("India")
        });
        
    })
})